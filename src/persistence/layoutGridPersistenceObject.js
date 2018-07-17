import {LayoutNodePersistenceObject} from './layoutNodePersistenceObject';

export class LayoutGridPersistenceObject {
    constructor() {
        this.nodes = [];
    }

    convertFromPersistence(persistence) {
        this.rows = persistence.properties.get('rows');
        this.columns = persistence.properties.get('columns');

        for (let child of persistence.children) {
            if (child.name === 'LayoutNodes') {
                this._convertNodes(child);
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('LayoutGrid');

        retVal.properties.set('rows', this.rows);
        retVal.properties.set('columns', this.columns);

        let nodes = new ConfigurationObject('LayoutNodes');
        for (let node of this.nodes) {
            nodes.children.push(node.convertToConfig());
        }
        retVal.children.push(nodes);
        
        return retVal;
    }

    _convertNodes(persistence) {
        for (let child of persistence.children) {
            let node = new LayoutNodePersistenceObject();
            node.convertFromPersistence(child);
            this.nodes.push(node);
        }
    }
}