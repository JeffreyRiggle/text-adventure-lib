export class ModifyPlayerAction {
    constructor(playerName, modData) {
        this.playerName = playerName;
        this.modData = modData;
    }

    execute(params) {
        this._setPlayer(params.players);

        if (this.modData.args.modificationObject === 'Player') {
            this._playerModification();
        }
        if (this.modData.args.modificationObject === 'Characteristic') {
            this._characteristicModification();
        }
        if (this.modData.args.modificationObject === 'Attribute') {
            this._attributeModification();
        }
        if (this.modData.args.modificationObject === 'Equipment') {
            this._equipmentModification();
        }
        if (this.modData.args.modificationObject === 'Inventory') {
            this._inventoryModification();            
        }
        if (this.modData.args.modificationObject === 'BodyPart') {
            this._bodyPartModification();
        }
    }

    _setPlayer(players) {
        for (let player of players) {
            if (player.name === this.playerName) {
                this.player = player;
                return;
            }
        }
    }

    _playerModification() {
        if (this.modData.modificationType === 'Change') {
            this.player.name = this.modData.args.data;
        }
    }

    _characteristicModification() {
        if (this.modData.modificationType === 'Add') {
            this.player.addCharacteristic(this.modData.args.data);
        }
        if (this.modData.modificationType === 'Remove') {
            this.player.removeCharacteristic(this.modData.args.data);
        }
        if (this.modData.modificationType === 'Change') {
            let chr = this._find(this.player.characteristics, this.modData.args.id);
            if (chr) {
                this._updateValue(chr);
            }
        }
    }

    _attributeModification() {
        if (this.modData.modificationType === 'Add') {
            this.player.addAttribute(this.modData.args.data);
        }
        if (this.modData.modificationType === 'Remove') {
            this.player.removeAttribute(this.modData.args.data);
        }
        if (this.modData.modificationType === 'Change') {
            let att = this._find(this.player.attributes, this.modData.args.id);
            if (att) {
                this._updateValue(att);
            }
        }
    }

    _equipmentModification() {
        if (this.modData.modificationType === 'Add') {
            this.player.equipment.equip(this.modData.args.id, this.modData.args.data);
        }
        if (this.modData.modificationType === 'Remove') {
            this.player.equipment.unequip(this.modData.args.id);
        }
        if (this.modData.modificationType === 'Change') {
            let item = this._changeItem(this.player.equipment.unequip(this.modData.args.id));
            this.player.equipment.equip(this.modData.args.id, item);
        }
    }

    _inventoryModification() {
        if (this.modData.modificationType === 'Add') {
            this.player.inventory.addItem(this.modData.args.id, this.modData.args.data);
        }
        if (this.modData.modificationType === 'Remove') {
            this.player.inventory.removeItem(this.modData.args.id);
        }
        if (this.modData.modificationType === 'Change') {
            let item = this._find(this.player.inventory.items, this.modData.args.id);
            if (!isNaN(this.modData.args.data)) {
                this.player.inventory.setItemAmount(item, this.modData.args.data);
                return;
            }

            var amount = this.player.inventory.getItemAmount(item);
            this.player.inventory.removeItem(item);
            item = this._changeItem(item);
            this.player.inventory.addItem(item, amount);
        }
    }

    _bodyPartModification() {
        if (this.modData.modificationType === 'Add') {
            this.player.addBodyPart(this.modData.args.data);
        }
        if (this.modData.modificationType === 'Remove') {
            this.player.removeBodyPart(this.modData.args.data);
        }
        if (this.modData.modificationType === 'Change') {
            let bp = this._find(this.player.bodyParts, this.modData.args.id);
            if (bp) {
                this._changeBodyPart(bp);
            }
        }
    }

    _changeItem(item) {
        if (this.modData.args.changeType === 'Assign') {
            item = this.modData.args.data;
        }
        if (this.modData.args.changeType === 'Add') {
            item.addProperty(this.modData.args.data);
        }
        if (this.modData.args.changeType === 'Subtract') {
            item.removeProperty(this.modData.args.data);
        }

        return item;
    }

    _changeBodyPart(bodyPart) {
        if (this.modData.args.changeType === 'Assign') {
            this.player.removeBodyPart(bodyPart);
            bodyPart = this.modData.args.data;
            this.player.addBodyPart(bodyPart);
        }
        if (this.modData.args.changeType === 'Add') {
            bodyPart.addCharacteristic(this.modData.args.data);
        }
        if (this.modData.args.changeType === 'Subtract') {
            bodyPart.removeCharacteristic(this.modData.args.data);
        }
    }

    _updateValue(obj) {
        if (this.modData.args.changeType === 'Assign') {
            obj.value = this.modData.args.data;
        }
        if (this.modData.args.changeType === 'Add') {
            obj.value += this.modData.args.data;
        }
        if (this.modData.args.changeType === 'Subtract') {
            obj.value -= this.modData.args.data;
        }
    }

    _find(arr, id) {
        for (let val of arr) {
            if (val.name === id) {
                return val;
            }
        }
    }
}