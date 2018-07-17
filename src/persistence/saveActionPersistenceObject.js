import {SaveAction} from '../actions/saveAction';

export class SaveActionPersistenceObject {
    convertFromPersistence(persistence, persistenceData) {
        for (let child of persistence.children) {
            if (child.name === 'SaveLocation') {
                this.saveLocation = child.value;
            }
        }

        this.persistenceData = persistenceData;
    }

    convertToAction() {
        return new SaveAction(this.saveLocation, this.persistenceData);
    }
}