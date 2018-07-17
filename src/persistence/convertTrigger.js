import {TextTriggerPersistenceObject} from './textTriggerPersistenceObject';
import {PlayerTriggerPersistenceObject} from './playerTriggerPersistenceObject';
import {MultiPartTriggerPersistenceObject} from './multiPartTriggerPersistenceObject';
import {ScriptedTriggerPersistenceObject} from './scriptedTriggerPersistenceObject';

const convertTrigger = (persistence) => {
    let trigger;
    let type = persistence.properties.get('type');

    if (type === 'Text') {
        trigger = new TextTriggerPersistenceObject();
        trigger.convertFromPersistence(persistence);
    }
    if (type === 'Player') {
        trigger = new PlayerTriggerPersistenceObject();
        trigger.convertFromPersistence(persistence);
    }
    if (type === 'Script') {
        trigger = new ScriptedTriggerPersistenceObject();
        trigger.convertFromPersistence(persistence);
    }
    if (type === 'MultiPart') {
        trigger = new MultiPartTriggerPersistenceObject();
        trigger.convertFromPersistence(persistence);
    }

    return trigger;
};

export {
    convertTrigger
};