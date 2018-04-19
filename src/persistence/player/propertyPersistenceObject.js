import {NamedPersistenceObject} from './namedPersistenceObject';
import {Property} from '../../../node_modules/player-lib/dist/main';

export class PropertyPersistenceObject extends NamedPersistenceObject {
    convertToProperty() {
        return new Property(this.name, this.description, this.value);
    }    
}