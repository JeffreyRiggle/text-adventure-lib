const NAME = 'Name',
 DESCRIPTION = 'Description',
 VALUE = 'Value';

export class NamedPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === NAME) {
                this.name = child.value;
            }
            if (child.name === DESCRIPTION) {
                this.description = child.value;
            }
            if (child.name === VALUE) {
                this.value = child.value;
            }
        }
    }
}