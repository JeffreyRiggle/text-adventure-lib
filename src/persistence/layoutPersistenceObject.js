import {LayoutGridPersistenceObject} from './layoutGridPersistenceObject';
import { ConfigurationObject } from '@jeffriggle/persist-lib/dist/main';

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

    convertToConfig() {
        let retVal = new ConfigurationObject('Layout');

        retVal.children.push(new ConfigurationObject('LayoutType', this.layoutType));
        if (this.content) {
            retVal.children.push(new ConfigurationObject('Content', this.content));
        }
        retVal.children.push(new ConfigurationObject('LayoutID', this.id));
        retVal.children.push(this.layout.convertToConfig());

        return retVal;
    }

    _convertLayout(persistence) {
        let layout = new LayoutGridPersistenceObject();
        layout.convertFromPersistence(persistence);
        this.layout = layout;
    }
}