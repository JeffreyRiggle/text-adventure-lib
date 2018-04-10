import {ScriptedAction} from '../actions/scriptedAction';

export class ScriptedActionPersistenceObject {
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

    convertToAction() {
        return new ScriptedAction(this.script);
    }
}