export class TransitionPersistenceObject {
    
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'DisplayType') {
                this.displayType = child.value;
            }
            if (child.name === 'MediaLocation') {
                this.mediaLocation = child.value;
            }
        }
    }
}