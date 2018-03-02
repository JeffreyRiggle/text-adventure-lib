import { EventEmitter } from "events";

class FinishAction extends EventEmitter {
    constructor() {
        super();
    }

    get finishedEvent() {
        return 'finished';
    }

    execute(params) {
        this.emit(this.finishedEvent);
    }
}

export default FinishAction;