import {Player} from '../../node_modules/player-lib/dist/main';
import {AttributePersistenceObject} from './attributePersistenceObject';
import {CharacteristicPersistenceObject} from './characteristicPersistenceObject';
import {BodyPartPersistenceObject} from './bodyPartPersistenceObject';
import {InventoryPersistenceObject} from './inventoryPersistenceObject';
import {EquipmentPersistenceObject} from './equipmentPersistenceObject';

const NAME = 'Name',
 ATTRIBUTES = 'Attributes',
 CHARACTERISTICS = 'Characteristics',
 BODYPARTS = 'BodyParts',
 INVENTORY = 'Inventory',
 EQUIPMENT = 'Equipment';

export class PlayerPersistenceObject {
    constructor() {
        this.attributes = [];
        this.characteristics = [];
        this.bodyParts = [];
        this.inventory = new InventoryPersistenceObject();
        this.equipment = new EquipmentPersistenceObject();
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === NAME) {
                this.playerName = child.value;
            }
            if (child.name === ATTRIBUTES) {
                this._convertAttributes(child);
            }
            if (child.name === CHARACTERISTICS) {
                this._convertCharacteristics(child);
            }
            if (child.name === BODYPARTS) {
                this._convertBodyParts(child);
            }
            if (child.name === INVENTORY) {
                this.inventory.convertFromPersistence(child);
            }
            if (child.name === EQUIPMENT) {
                this.equipment.convertFromPersistence(child);
            }
        }
    }

    _convertAttributes(persistence) {
        for (let child of persistence.children) {
            let att = new AttributePersistenceObject();
            att.convertFromPersistence(child);
            this.attributes.push(att);
        }
    }

    _convertCharacteristics(peristence) {
        for (let child of persistence.children) {
            let chr = new CharacteristicsPersistenceObject();
            chr.convertFromPersistence(child);
            this.characteristics.push(chr);
        }
    }

    _convertBodyParts(persistence) {
        for (let child of peristence.children) {
            let bp = new BodyPartPersistenceObject();
            bp.convertFromPersistence(child);
            this.bodyParts.push(bp);
        }
    }

    convertToPlayer() {
        let player = new Player(this.playerName);

        for (let att of this.attributes) {
            player.addAttribute(att.convertToAttribute());
        }

        for (let chr of this.characteristics) {
            player.addCharacteristic(chr.convertToCharacteristic());
        }

        for (let bp of this.bodyParts) {
            player.addBodyPart(bp.convertToBodyPart());
        }

        player.inventory = this.inventory.convertToInventory();
        player.equipment = this.equipment.convertToEquipment();

        return player;
    }
}