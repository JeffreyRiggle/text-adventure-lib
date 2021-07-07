import {AppendTextAction} from '../actions/appendTextAction';
import { ConfigurationObject } from '@jeffriggle/persist-lib/dist/main';

export class AppendTextPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Action');
        retVal.properties.set('type', 'AppendText');

        let params = new ConfigurationObject('Parameters');
        params.children.push(new ConfigurationObject('AppendText', this.appendText));
        retVal.children.push(params);

        return retVal;
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'AppendText') {
                this.appendText = child.value;
            }
        }
    }

    convertToAction() {
        return new AppendTextAction(this.appendText);
    }
}