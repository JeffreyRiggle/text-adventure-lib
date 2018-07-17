import {ScriptedTrigger} from '../triggers/scriptedTrigger';
import { ConfigurationObject } from '../../node_modules/persist-lib/dist/main';

export class ScriptedTriggerPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Trigger');
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

    convertToTrigger() {
        return new ScriptedTrigger(this.script);
    }
}