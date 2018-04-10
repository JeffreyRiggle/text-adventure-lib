import {FinishAction} from '../actions/finishAction';

export class FinishActionPersistenceObject {
    convertFromPersistence(persistence) {
        //No Op
    }

    convertToAction() {
        return new FinishAction();
    }
}