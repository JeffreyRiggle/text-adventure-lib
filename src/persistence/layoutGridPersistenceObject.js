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

    _convertNodes(persistence) {
        for (let child of children) {
            let node = new LayoutNodePersistenceObject();
            node.convertFromPersistence(persistence);
            this.nodes.push(node);
        }
    }
}