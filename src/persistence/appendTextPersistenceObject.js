import {AppendTextAction} from '../actions/appendTextAction';

export class AppendTextPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'AppendText') {
                this.appendText = child.value;
            }
        }
    }

    convertToAction() {
        return new AppendTextAction(this.appendText);
    }
}