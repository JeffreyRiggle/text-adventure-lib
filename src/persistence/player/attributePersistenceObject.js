import {NamedPersistenceObject} from './namedPersistenceObject';
import {Attribute} from '@jeffriggle/player-lib';

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