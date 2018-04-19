import {NamedPersistenceObject} from './namedPersistenceObject';
import {Attribute} from '../../../node_modules/player-lib/dist/main';

export class AttributePersistenceObject extends NamedPersistenceObject {
    convertToAttribute() {
        return new Attribute(this.name, this.description, this.value);
    }    
}