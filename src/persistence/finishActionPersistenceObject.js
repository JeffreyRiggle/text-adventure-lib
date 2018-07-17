import {FinishAction} from '../actions/finishAction';
import { ConfigurationObject } from '../../node_modules/persist-lib/dist/main';

export class FinishActionPersistenceObject {
    convertFromPersistence(persistence) {
        //No Op
    }

    convertToAction() {
        return new FinishAction();
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Action');
        retVal.properties.set('type', 'Finish');

        return retVal;
    }
}