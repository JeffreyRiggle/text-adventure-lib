import {NamedPersistenceObject} from './namedPersistenceObject';
import {Characteristic} from '../../../node_modules/player-lib/dist/main';

export class CharacteristicPersistenceObject extends NamedPersistenceObject {
    convertToCharacteristic() {
        return new Characteristic(this.name, this.description, this.value);
    }
}