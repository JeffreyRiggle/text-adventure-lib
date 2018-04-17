import {CompletionTimerPersistenceObject} from './completionTimerPersistenceObject';

const convertTimer = (persistence) => {
    let type = persistence.properties.get('type');

    let timer;

    if (type === 'Completion') {
        timer = new CompletionTimerPersistenceObject();
        timer.convertFromPersistence(persistence);
    }

    return timer;
};

export {
    convertTimer
};