import {NamedPersistenceObject} from './namedPersistenceObject';
import {Characteristic} from '@jeffriggle/player-lib';

export class CharacteristicPersistenceObject extends NamedPersistenceObject {
    constructor(characteristic) {
        super('Characteristic');

        if (characteristic) {
            this.convertToPersistence(characteristic);
        }
    }

    convertToCharacteristic() {
        return new Characteristic(this.name, this.description, this.value);
    }
}