import { ConfigurationObject } from '@jeffriggle/persist-lib';

const NAME = 'Name',
 DESCRIPTION = 'Description',
 VALUE = 'Value';

export class NamedPersistenceObject {
    constructor(type) {
        this.type = type;
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === NAME) {
                this.name = child.value;
            }
            if (child.name === DESCRIPTION) {
                this.description = child.value;
            }
            if (child.name === VALUE) {
                this.value = child.value;
            }
        }
    }

    convertToPersistence(namedObject) {
        this.name = namedObject.name;
        this.description = namedObject.description;
        this.value = namedObject.value;
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('NamedObject');
        
        retVal.properties.set('type', this.type);

        retVal.children.push(new ConfigurationObject(NAME, this.name));
        retVal.children.push(new ConfigurationObject(DESCRIPTION, this.description));
        retVal.children.push(new ConfigurationObject(VALUE, this.value));
        
        return retVal;
    }
}