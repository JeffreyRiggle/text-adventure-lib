import {CompletionAction} from '../actions/completionAction';

export class CompletionActionPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'CompletionData') {
                this.completionData = child.value;
            }
        }
    }

    convertToAction() {
        return new CompletionAction(this.completionData);
    }
}