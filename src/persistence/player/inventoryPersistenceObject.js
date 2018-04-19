import {Inventory} from '../../../node_modules/player-lib/dist/main';
import {ItemPersistenceObject} from './itemPersistenceObject';
 
export class InventoryPersistenceObject {
    constructor() {
        this.items = [];
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            this._convertItem(child);
        }
    }

    _convertItem(persistence) {
        for (let child of persistence.children) {
            let item = new ItemPersistenceObject();
            item.convertFromPersistence(child);
            this.items.push(item);
        }
    }
    
    convertToInventory() {
        let inv = new Inventory();

        for (let item of this.items) {
            inv.addCharacteristic(item.convertToItem(), item.amount);
        }

        return inv;
    }    
}