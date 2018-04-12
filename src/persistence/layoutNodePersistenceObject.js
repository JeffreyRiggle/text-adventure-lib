export class LayoutNodePersistenceObject {
    constructor() {
        this.properties = new Map();
    }

    convertFromPersistence(persistence) {
        this.row = persistence.properties.get('row');
        this.column = persistence.properties.get('column');
        this.columnSpan = persistence.properties.get('columnSpan');
        this.rowSpan = persistence.properties.get('rowSpan');

        for (let child of persistence.children) {
            if (child.name === 'NodeID') {
                this.id = child.value;
            }
            if (child.name === 'LayoutValue') {
                this.value = child.value;
            }
            if (child.name === 'AssociatedProperties') {
                this._convertAssociatedProperties(child);
            }
        }
    }

    _convertAssociatedProperties(persistence) {
        for (let child of persistence.children) {
            this.properties.set(child.name, child.value);
        }
    }
}