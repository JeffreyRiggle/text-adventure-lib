import {NamedPersistenceObject} from './namedPersistenceObject';
import {Property} from '../../../node_modules/player-lib/dist/main';

export class PropertyPersistenceObject extends NamedPersistenceObject {
    constructor(property) {
        super('Property');

        if (property) {
            this.convertToPersistence(property);
        }
    }
    
    convertToProperty() {
        return new Property(this.name, this.description, this.value);
    }    
}