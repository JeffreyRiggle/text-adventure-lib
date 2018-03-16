import { EventEmitter } from "events";

export class FinishAction extends EventEmitter {
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