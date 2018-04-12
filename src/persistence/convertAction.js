import {AppendTextPersistenceObject} from './appendTextPersistenceObject';
import {CompletionActionPersistenceObject} from './completionActionPersistenceObject';
import {ModifyPlayerPersistenceObject} from './modifyPlayerPersistenceObject';
import {ScriptedActionPersistenceObject} from './scriptedActionPersistenceObject';
import {FinishActionPersistenceObject} from './finishActionPersistenceObject';

const convertAction = (peristence) => {
    let action;
    let type = persistence.properties.get('type');

    if (type === 'AppendText') {
        action = new AppendTextPersistenceObject();
        action.convertFromPersistence(persistence);
    }
    if (type === 'Completion') {
        action = new CompletionActionPersistenceObject();
        action.convertFromPersistence(persistence);
    }
    if (type === 'ModifyPlayer') {
        action = new ModifyPlayerPersistenceObject();
        action.convertFromPersistence(persistence);
    }
    if (type === 'Script') {
        action = new ScriptedActionPersistenceObject();
        action.convertFromPersistence(persistence);
    }
    if (type === 'Finish') {
        action = new FinishActionPersistenceObject();
        action.convertFromPersistence(persistence);
    }

    return action;
};

export {
    convertAction
};