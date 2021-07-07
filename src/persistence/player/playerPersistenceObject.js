import {Player} from '../../../node_modules/player-lib/dist/main';
import {AttributePersistenceObject} from './attributePersistenceObject';
import {CharacteristicPersistenceObject} from './characteristicPersistenceObject';
import {BodyPartPersistenceObject} from './bodyPartPersistenceObject';
import {InventoryPersistenceObject} from './inventoryPersistenceObject';
import {EquipmentPersistenceObject} from './equipmentPersistenceObject';
import { ConfigurationObject } from '@jeffriggle/persist-lib/dist/main';

const NAME = 'Name',
 ATTRIBUTES = 'Attributes',
 CHARACTERISTICS = 'Characteristics',
 BODYPARTS = 'BodyParts',
 INVENTORY = 'Inventory',
 EQUIPMENT = 'Equipment';

export class PlayerPersistenceObject {
    constructor(player) {
        this.attributes = [];
        this.characteristics = [];
        this.bodyParts = [];
        this.inventory = new InventoryPersistenceObject();
        this.equipment = new EquipmentPersistenceObject();

        if (player) {
            this.convertToPersistence(player);
        }
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

    convertToPersistence(player) {
        this.playerName = player.name;

        for (let att of player.attributes) {
            this.attributes.push(new AttributePersistenceObject(att));
        }

        for (let chr of player.characteristics) {
            this.characteristics.push(new CharacteristicPersistenceObject(chr));
        }

        for (let bp of player.bodyParts) {
            this.bodyParts.push(new BodyPartPersistenceObject(bp));
        }

        this.inventory.convertToPersistence(player.inventory);
        this.equipment.convertToPersistence(player.equipment);
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Player');

        retVal.children.push(new ConfigurationObject(NAME, this.playerName));

        let attConfig = new ConfigurationObject(ATTRIBUTES);
        for (let att of this.attributes) {
            attConfig.children.push(att.convertToConfig());
        }
        retVal.children.push(attConfig);

        let chrConfig = new ConfigurationObject(CHARACTERISTICS);
        for (let chr of this.characteristics) {
            chrConfig.children.push(chr.convertToConfig());
        }
        retVal.children.push(chrConfig);

        let bpConfig = new ConfigurationObject(BODYPARTS);
        for (let bp of this.bodyParts) {
            bpConfig.children.push(bp.convertToConfig());
        }
        retVal.children.push(bpConfig);

        retVal.children.push(this.inventory.convertToConfig());
        retVal.children.push(this.equipment.convertToConfig());

        return retVal;
    }

    _convertAttributes(persistence) {
        for (let child of persistence.children) {
            let att = new AttributePersistenceObject();
            att.convertFromPersistence(child);
            this.attributes.push(att);
        }
    }

    _convertCharacteristics(persistence) {
        for (let child of persistence.children) {
            let chr = new CharacteristicPersistenceObject();
            chr.convertFromPersistence(child);
            this.characteristics.push(chr);
        }
    }

    _convertBodyParts(persistence) {
        for (let child of persistence.children) {
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