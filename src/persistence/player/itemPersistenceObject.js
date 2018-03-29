import {Item} from '../../node_modules/player-lib/dist/main';
import {PropertyPersistenceObject} from './propertyPersistenceObject';

const NAME = 'Name',
 DESCRIPTION = 'Description',
 PROPERTIES = 'Properties',
 AMOUNT = 'Amount';
 
export class ItemPersistenceObject {
    constructor() {
        this.properties = [];
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === NAME) {
                this.name = child.value;
            }
            if (child.name === DESCRIPTION) {
                this.description = child.value;
            }
            if (child.name === PROPERTIES) {
                this._convertProperties(child);
            }
        }

        this.amount = persistence.properties.get(AMOUNT);
    }

    _convertProperties(persistence) {
        for (let child of persistence.children) {
            let prop = new PropertyPersistenceObject();
            prop.convertFromPersistence(child);
            this.properties.push(prop);
        }
    }
    
    convertToItem() {
        let item = new Item(this.name, this.description);

        for (let prop of this.properties) {
            item.addProperty(prop.convertToProperty());
        }

        return item;
    }    
}