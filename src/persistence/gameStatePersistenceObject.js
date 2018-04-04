export class GameStatePersistenceObject {
    constructor() {
        this.options = [];
        this.timers = [];
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'StateId') {
                this.stateId = child.value;
            }
            if (child.name === 'TextLog') {
                this.textLog = child.value;
            }
            if (child.name === 'Options') {
                this._convertOptions(child);
            }
            if (child.name === 'Timers') {
                this._convertTimers(child);
            }
            if (child.name === 'LayoutInfo') {
                this._convertLayoutInfo(child);
            }
        }
    }

    convertOptions(persistence) {
        for (let child of persistence.children) {
            let option = new OptionPersistenceObject();
            option.convertFromPersistence(persistence);
            this.options.push(option);
        }
    }

    convertTimers(persistence) {
        for (let child of persistence.children) {
            let timer = new TimerPersistenceObject();
            timer.convertFromPersistence(persistence);
            this.timers.push(timer);
        }
    }

    convertLayoutInfo(persistence) {
        this.layout = new LayoutInfoPersistenceObject();
        this.layout.convertFromPersistence(persistence);
    }
}