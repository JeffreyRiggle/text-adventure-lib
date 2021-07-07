import {CompletionAction} from '../actions/completionAction';
import {TimedAction} from '../timers/timedAction';
import {ConfigurationObject} from '@jeffriggle/persist-lib/dist/main';

export class CompletionTimerPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'CompletionData') {
                this.completionData = child.value;
            }
            if (child.name === 'Duration') {
                this.duration = Number(child.value);
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Timer');
        retVal.properties.set('type', 'Completion');

        retVal.children.push(new ConfigurationObject('CompletionData', this.completionData));
        retVal.children.push(new ConfigurationObject('Duration', String(this.duration)));

        return retVal;
    }

    convertToTimer() {
        let action = new CompletionAction(this.completionData);
        return new TimedAction(action, this.duration);
    }
}