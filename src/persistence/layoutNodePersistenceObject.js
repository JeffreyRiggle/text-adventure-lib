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

    convertToConfig() {
        let retVal = new ConfigurationObject('LayoutNode');

        retVal.properties.push('row', this.row);
        retVal.properties.push('column', this.column);
        retVal.properties.push('columnSpan', this.columnSpan);
        retVal.properties.push('rowSpan', this.rowSpan);

        retVal.children.push(new ConfigurationObject('NodeID', this.id));
        retVal.children.push(new ConfigurationObject('LayoutValue', this.value));

        let props = new ConfigurationObject('AssociatedProperties');
        this.properties.forEach((value, key) => {
            props.push(new ConfigurationObject(key, value));
        });
        retVal.children.push(props);

        return retVal;
    }

    _convertAssociatedProperties(persistence) {
        for (let child of persistence.children) {
            this.properties.set(child.name, child.value);
        }
    }
}