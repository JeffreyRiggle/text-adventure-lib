import {LayoutGridPersistenceObject} from './layoutGridPersistenceObject';

export class LayoutPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'LayoutType') {
                this.layoutType = child.value;
            }
            if (child.name === 'Content') {
                this.content = child.value;
            }
            if (child.name === 'LayoutGrid') {
                this._convertLayout(child);
            }
            if (child.name === 'LayoutID') {
                this.id = child.value;
            }
        }
    }

    _convertLayout(persistence) {
        let layout = new LayoutGridPersistenceObject();
        layout.convertFromPersistence(persistence);
        this.layout = layout;
    }
}