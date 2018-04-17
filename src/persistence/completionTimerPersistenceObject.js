import {CompletionAction} from '../actions/completionAction';
import {TimedAction} from '../timers/timedAction';

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

    convertToTimer() {
        let action = new CompletionAction(this.completionData);
        return new TimedAction(action, this.duration);
    }
}