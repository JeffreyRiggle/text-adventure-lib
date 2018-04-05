import {ScriptedTrigger} from '../triggers/scriptedTrigger';

export class ScriptedTriggerPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
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