export class OptionPersistenceObject {
    constructor() {
        this.triggers = [];
    }

    convertFromPersistence(peristence) {
        for (let child of peristence.children) {
            if (child.name === 'Triggers') {
                this._convertTriggers(child);
            }
            if (child.name === 'Action') {
                this._convertAction(child);
            }
        }
    }

    _convertTriggers(persistence) {
        for (let child of persistence.children) {
            //TODO create trigger creator
            this.triggers.push(convertTrigger(persistence));
        }
    }

    _convertAction(persistence) {

    }
}