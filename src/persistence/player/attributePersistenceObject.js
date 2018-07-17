import {NamedPersistenceObject} from './namedPersistenceObject';
import {Attribute} from '../../../node_modules/player-lib/dist/main';

export class AttributePersistenceObject extends NamedPersistenceObject {
    constructor(attribute) {
        super('Attribute');

        if (attribute) {
            this.convertToPersistence(attribute);
        }
    }

    convertToAttribute() {
        return new Attribute(this.name, this.description, this.value);
    }
}