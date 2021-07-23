import {CompletionAction} from '../actions/completionAction';
import { ConfigurationObject } from '@jeffriggle/persist-lib';

export class CompletionActionPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Action');
        retVal.properties.set('type', 'Completion');

        let params = new ConfigurationObject('Parameters');
        params.children.push(new ConfigurationObject('CompletionData', this.completionData));
        retVal.children.push(params);

        return retVal;
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'CompletionData') {
                this.completionData = child.value;
            }
        }
    }

    convertToAction() {
        return new CompletionAction(this.completionData);
    }
}