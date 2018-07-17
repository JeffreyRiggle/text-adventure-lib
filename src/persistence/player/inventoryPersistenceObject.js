import {Inventory} from '../../../node_modules/player-lib/dist/main';
import {ItemPersistenceObject} from './itemPersistenceObject';
import { ConfigurationObject } from '../../../node_modules/persist-lib/dist/main';

export class InventoryPersistenceObject {
    constructor(inventory) {
        this.items = [];

        if (inventory) {
            this.convertToPersistence(inventory);
        }
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            this._convertItem(child);
        }
    }

    convertToPersistence(inventory) {
        inventory.itemMap.forEach((value, key, map) => {
            let item = new ItemPersistenceObject(key);
            item.amount = value;
            this.items.push(item);
        });
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Inventory');
        
        let itms = new ConfigurationObject('Items');
        for (let item of this.items) {
            let config = item.convertToConfig();
            if (item.amount) {
                config.properties.set('Amount', item.amount);
            }

            itms.children.push(config);
        }

        retVal.children.push(itms);

        return retVal;
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
            inv.addItem(item.convertToItem(), item.amount);
        }

        return inv;
    }    
}