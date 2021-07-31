import {MultiPartTrigger} from '../triggers/multiPartTrigger';
import {TextTriggerPersistenceObject} from './textTriggerPersistenceObject';
import {PlayerTriggerPersistenceObject} from './playerTriggerPersistenceObject';
import { ConfigurationObject } from '@jeffriggle/persist-lib';

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

    convertToConfig() {
        let retVal = new ConfigurationObject('Trigger');
        retVal.properties.set('type', 'MultiPart');

        let params = new ConfigurationObject('Parameters');
        let trigs = new ConfigurationObject('Triggers');

        for (let trig of this.triggers) {
            trigs.children.push(trig.convertToConfig());
        }
        
        params.children.push(trigs);
        retVal.children.push(params);

        return retVal;
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