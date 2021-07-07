import { convertTrigger } from './convertTrigger';
import { convertAction } from './convertAction';
import { Option } from '../option/option';
import { ConfigurationObject } from '@jeffriggle/persist-lib/dist/main';

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

    convertToConfig() {
        let retVal = new ConfigurationObject('Option');

        let trigs = new ConfigurationObject('Triggers');
        for (let trigger of this.triggers) {
            trigs.children.push(trigger.convertToConfig());
        }
        retVal.children.push(trigs);
        retVal.children.push(this.action.convertToConfig());

        return retVal;
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