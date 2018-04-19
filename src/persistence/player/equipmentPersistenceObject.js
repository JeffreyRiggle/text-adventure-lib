import {Equipment} from '../../../node_modules/player-lib/dist/main';
import {ItemPersistenceObject} from './itemPersistenceObject';
 
export class EquipmentPersistenceObject {
    constructor() {
        this.equipment = new Map();
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            this._convertEquip(child);
        }
    }

    _convertEquip(persistence) {
        let items = [];
        let bodyParts = [];

        for (let child of persistence.children) {
            if (child.name === ITEM) {
                let item = new ItemPersistenceObject();
                item.convertFromPersistence(child);
                items.push(item);
            }
            if (child.name === BODYPART) {
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