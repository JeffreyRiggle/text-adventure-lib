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
}