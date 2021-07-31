import { load, convertConfigJSONToXML } from '@jeffriggle/persist-lib';
import { TextAdventurePersistenceObject } from './textAdventurePersistenceObject';
import { save } from '../core/fileManager';
import { setPersistenceData } from './convertAction';

export class TextAdventurePersistenceManager {
    constructor(data, overridePersistence = true) {
        this.data = data;
        this.textAdventure = new TextAdventurePersistenceObject();

        if (overridePersistence) {
            setPersistenceData(data);
        }
    }

    load() {
        let persist = load(this.data, 'xml');
        this.textAdventure.convertFromPersistence(persist);
    }

    save(fileName) {
        let ser = new XMLSerializer();
        let data = ser.serializeToString(convertConfigJSONToXML(this.textAdventure.convertToConfig()));
        save(data, fileName);
    }
}