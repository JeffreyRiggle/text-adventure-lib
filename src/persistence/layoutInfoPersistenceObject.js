import { ConfigurationObject } from '../../node_modules/persist-lib/dist/main';

export class LayoutInfoPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'LayoutContent') {
                this.layoutContent = child.value;
            }
            if (child.name === 'LayoutID') {
                this.layoutId = child.value;
            }
            if (child.name === 'LayoutType') {
                this.layoutType = child.value;
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('LayoutInfo');

        retVal.children.push(new ConfigurationObject('LayoutContent', this.layoutContent));
        retVal.children.push(new ConfigurationObject('LayoutID', this.layoutId));
        retVal.children.push(new ConfigurationObject('LayoutType', this.layoutType));

        return retVal;
    }
}