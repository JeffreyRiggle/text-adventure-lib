export class MultiPartTrigger {
    constructor(triggers) {
        this.triggers = triggers;
    }

    shouldFire(data) {
        let retVal = true;

        if (this.triggers.length === 0) {
            return false;
        }

        this.triggers.forEach((trigger, index, arr) => {
            if (!retVal) {
                return;
            }

            if (!trigger.shouldFire(data)) {
                retVal = false;
            }
        });

        return retVal;
    }
}