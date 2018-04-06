import {MultiPartTrigger} from '../triggers/multiPartTrigger';
import {TextTriggerPersistenceObject} from './textTriggerPersistenceObject';
import {PlayerTriggerPersistenceObject} from './playerTriggerPersistenceObject';

export class MultiPartTriggerPersistenceObject {
    constructor() {
        this.triggers = [];
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Trigger') {
                this._convertTrigger(child);
            }
        }
    }

    _convertTrigger(persistence) {
        let type = persistence.properties.get('type');

        if (type === 'Text') {
            let trigger = new TextTriggerPersistenceObject();
            trigger.convertFromPersistence(persistence);
            this.triggers.push(trigger);
        }
        if (type === 'Player') {
            let trigger = new PlayerTriggerPersistenceObject();
            trigger.convertFromPersistence(persistence);
            this.triggers.push(trigger);
        }
        if (type === 'MultiPart') {
            let trigger = new MultiPartTriggerPersistenceObject();
            trigger.convertFromPersistence(persistence);
            this.triggers.push(trigger);
        }
    }

    convertToTrigger() {
        let triggers = [];

        for (let trigger of this.triggers) {
            triggers.push(trigger.convertToTrigger());
        }

        return new MultiPartTrigger(triggers);
    }
}