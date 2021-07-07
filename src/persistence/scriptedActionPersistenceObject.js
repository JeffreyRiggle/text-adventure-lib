import {ScriptedAction} from '../actions/scriptedAction';
import { ConfigurationObject } from '@jeffriggle/persist-lib/dist/main';

export class ScriptedActionPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Action');
        retVal.properties.set('type', 'Script');

        let params = new ConfigurationObject('Parameters');
        params.children.push(new ConfigurationObject('Script', btoa(this.script)));
        retVal.children.push(params);

        return retVal;
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Script') {
                this.script = atob(child.value);
            }
        }
    }

    convertToAction() {
        return new ScriptedAction(this.script);
    }
}