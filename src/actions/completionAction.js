import { EventEmitter } from "events";

export class CompletionAction extends EventEmitter {
    constructor(data) {
        super();
        this.data = data;
    }

    get completionEvent() {
        return 'completed';
    }

    execute(params) {
        this.emit(this.completionEvent, this.data);
    }
}