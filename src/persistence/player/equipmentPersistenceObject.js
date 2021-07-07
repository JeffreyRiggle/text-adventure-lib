import {Equipment} from '../../../node_modules/player-lib/dist/main';
import {ItemPersistenceObject} from './itemPersistenceObject';
import {BodyPartPersistenceObject} from './bodyPartPersistenceObject';
import { ConfigurationObject } from '@jeffriggle/persist-lib/dist/main';
 
export class EquipmentPersistenceObject {
    constructor(equip) {
        this.equipment = new Map();

        if (equip) {
            this.convertToPersistence(equip);
        }
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            this._convertEquip(child);
        }
    }

    convertToPersistence(equip) {
        equip.equiped.forEach((value, key, map) => {
            this.equipment.set(new BodyPartPersistenceObject(key), new ItemPersistenceObject(value));
        });
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Equipment');

        this.equipment.forEach((value, key) => {
            let equip = new ConfigurationObject('Equiptable');

            equip.children.push(value.convertToConfig());
            equip.children.push(key.convertToConfig());

            retVal.children.push(equip);
        });

        return retVal;
    }

    _convertEquip(persistence) {
        let items = [];
        let bodyParts = [];

        for (let child of persistence.children) {
            if (child.name === 'Item') {
                let item = new ItemPersistenceObject();
                item.convertFromPersistence(child);
                items.push(item);
            }
            if (child.name === 'BodyPart') {
                let bp = new BodyPartPersistenceObject();
                bp.convertFromPersistence(child);
                bodyParts.push(bp);
            }
        }

        for (let i = 0; i < items.length; i++) {
            this.equipment.set(bodyParts[i], items[i]);
        }
    }
    
    convertToEquipment() {
        let equip = new Equipment();

        this.equipment.forEach((value, key, map) => {
            equip.equip(key.convertToBodyPart(), value.convertToItem());
        });

        return equip;
    }    
}