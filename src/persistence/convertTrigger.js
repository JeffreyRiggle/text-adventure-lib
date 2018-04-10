import {TextTriggerPersistenceObject} from './textTriggerPersistenceObject';
import {PlayerTriggerPersistenceObject} from './playerTriggerPersistenceObject';
import {MultiPartTriggerPersistenceObject} from './multiPartTriggerPersistenceObject';

const convertTrigger = (peristence) => {
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
    if (type === 'MultiPart') {
        trigger = new MultiPartTriggerPersistenceObject();
        trigger.convertFromPersistence(persistence);
    }

    return trigger;
};

export {
    convertTrigger
};