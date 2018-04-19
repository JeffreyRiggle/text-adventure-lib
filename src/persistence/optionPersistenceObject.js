import { convertTrigger } from './convertTrigger';
import { convertAction } from './convertAction';
import { Option } from '../option/option';

export class OptionPersistenceObject {
    constructor() {
        this.triggers = [];
    }

    convertFromPersistence(peristence) {
        for (let child of peristence.children) {
            if (child.name === 'Triggers') {
                this._convertTriggers(child);
            }
            if (child.name === 'Action') {
                this._convertAction(child);
            }
        }
    }

    _convertTriggers(persistence) {
        for (let child of persistence.children) {
            this.triggers.push(convertTrigger(child));
        }
    }

    _convertAction(persistence) {
        this.action = convertAction(persistence);
    }

    convertToOption() {
        let triggers = [];

        for (let trigger of this.triggers) {
            triggers.push(trigger.convertToTrigger());
        }

        return new Option(triggers, this.action.convertToAction());
    }
}