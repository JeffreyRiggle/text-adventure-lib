import { load } from '../../node_modules/persist-lib/dist/main.js';
import { TextAdventurePersistenceObject } from './textAdventurePersistenceObject';

export class TextAdventurePersistenceManager {
    constructor(data) {
        this.data = data;
        this.textAdventure = new TextAdventurePersistenceObject();
    }

    load() {
        let persist = load(this.data, 'xml');
        this.textAdventure.convertFromPersistence(persist);
    }

    save() {

    }
}