import {Item} from '../../../node_modules/player-lib/dist/main';
import {PropertyPersistenceObject} from './propertyPersistenceObject';
import { ConfigurationObject } from '@jeffriggle/persist-lib';

const NAME = 'Name',
 DESCRIPTION = 'Description',
 PROPERTIES = 'Properties',
 AMOUNT = 'Amount';
 
export class ItemPersistenceObject {
    constructor(item) {
        this.properties = [];

        if (item) {
            this.convertToPersistence(item);
        }
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

    convertToPersistence(item) {
        this.name = item.name;
        this.description = item.description;

        for (let prop of item.properties) {
            this.properties.push(new PropertyPersistenceObject(prop));
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Item');
        
        retVal.children.push(new ConfigurationObject(NAME, this.name));
        retVal.children.push(new ConfigurationObject(DESCRIPTION, this.description));
        
        let props = new ConfigurationObject(PROPERTIES);
        for (let prop of this.properties) {
            props.children.push(prop.convertToConfig());
        }
        retVal.children.push(props);
        
        return retVal;
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