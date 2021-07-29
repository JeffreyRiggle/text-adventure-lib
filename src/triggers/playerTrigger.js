import _ from 'underscore';
import '@jeffriggle/player-lib';

export class PlayerTrigger {
    constructor(playerName, data) {
        this.playerName = playerName;
        this.conditionData = data;
    }

    shouldFire(data) {
        this._setPlayer(data.players);

        if (this.conditionData.modificationObject === 'Attribute') {
            return this._processAttribute();
        }

        if (this.conditionData.modificationObject === 'Characteristic') {
            return this._processCharacteristic();
        }

        if (this.conditionData.modificationObject === 'BodyPart') {
            return this._processBodyPart();
        }

        if (this.conditionData.modificationObject === 'Player') {
            return this._processPlayer();
        }

        if (this.conditionData.modificationObject === 'Inventory') {
            return this._processInventory();
        }

        if (this.conditionData.modificationObject === 'Equipment') {
            return this._processEquipment();
        }

        return false;
    }

    _setPlayer(players) {
        for (let player of players) {
            if (player.name === this.playerName) {
                this.player = player;
                return;
            }
        }
    }

    _processAttribute() {
        let attribute = this._find(this.player.attributes, this.conditionData.id[0]);

        return this._processSimple(attribute);
    }

    _processCharacteristic() {
        let chr = this._find(this.player.characteristics, this.conditionData.id[0]);

        return this._processSimple(chr);
    }

    _processSimple(value) {
        if (this.conditionData.condition === 'GreaterThan') {
            return Number(value[this.conditionData.dataMember]) > Number(this.conditionData.comparisonData);
        }
        if (this.conditionData.condition === 'LessThan') {
            return Number(value[this.conditionData.dataMember]) < Number(this.conditionData.comparisonData);
        }
        if (this.conditionData.condition === 'EqualTo') {
            return value[this.conditionData.dataMember] == this.conditionData.comparisonData;
        }
        if (this.conditionData.condition === 'NotEqual') {
            return value[this.conditionData.dataMember] != this.conditionData.comparisonData;
        }
        if (this.conditionData.condition === 'Has') {
            return !!value;
        }

        return false;
    }

    _processBodyPart() {
        let bodyPart = this._find(this.player.bodyParts, this.conditionData.id[0]);
        let characteristic = null;

        if (this.conditionData.id.length > 1) {
            characteristic = this._find(bodyPart.characteristics, this.conditionData.id[1]);
        }

        return this._processComplex(bodyPart, characteristic);
    }

    _processPlayer() {
        if (this.conditionData.condition === 'EqualTo') {
            return _.isEqual(this.player, this.conditionData.comparisonData);
        }
        if (this.conditionData.condition === 'NotEqual') {
            return !_.isEqual(this.player, this.conditionData.comparisonData);
        }

        return false;
    }

    _processInventory() {
        let item = this._find(this.player.inventory.items, this.conditionData.id[0]);
        let property = null;

        if (this.conditionData.id.length > 1) {
            property = this._find(item.properties, this.conditionData.id[1]);
        }

        return this._processComplex(item, property);
    }

    _processEquipment() {
        let item = this._find(this.player.equipment.equiped, this.conditionData.id[0]);
        let property = null;

        if (this.conditionData.id.length > 1) {
            property = this._find(item.properties, this.conditionData.id[1]);
        }

        return this._processComplex(item, property);
    }

    _processComplex(value, subValue) {
        if (this.conditionData.condition === 'Has') {
            return !!value;
        }

        if (!subValue) {
            return false;
        }

        if (this.conditionData.condition === 'GreaterThan') {
            return Number(subValue[this.conditionData.dataMember]) > Number(this.conditionData.comparisonData);
        }
        if (this.conditionData.condition === 'LessThan') {
            return Number(subValue[this.conditionData.dataMember]) < Number(this.conditionData.comparisonData);
        }
        if (this.conditionData.condition === 'EqualTo') {
            return subValue[this.conditionData.dataMember] == this.conditionData.comparisonData;
        }
        if (this.conditionData.condition === 'NotEqual') {
            return subValue[this.conditionData.dataMember] != this.conditionData.comparisonData;
        }

        return false;
    }

    _find(arr, id) {
        for (let val of arr) {
            if (val.name === id) {
                return val;
            }
        }
    }
}