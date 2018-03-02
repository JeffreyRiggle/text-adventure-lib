class Option {
    constructor(triggers, action) {
        this.triggers = triggers;
        this.action = action;
    }

    shouldTrigger(data) {
        for (let trigger of this.triggers) {
            if (trigger.shouldFire(data)) {
                return true;
            }
        }

        return false;
    }
}

export default Option;