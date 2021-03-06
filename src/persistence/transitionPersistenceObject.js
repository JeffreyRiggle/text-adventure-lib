import { ConfigurationObject } from '../../node_modules/persist-lib/dist/main';

export class TransitionPersistenceObject {
    
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'DisplayType') {
                this.displayType = child.value;
            }
            if (child.name === 'MediaLocation') {
                this.mediaLocation = child.value;
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Transition');

        retVal.children.push(new ConfigurationObject('DisplayType', this.displayType));
        retVal.children.push(new ConfigurationObject('MediaLocation', this.mediaLocation));

        return retVal;
    }
}