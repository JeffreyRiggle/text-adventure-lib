import { EventEmitter } from "events";

class AppendTextAction extends EventEmitter {
    constructor(text) {
        super();
        this.appendText = text;
    }

    get sendMessageEvent() {
        return 'sendMessage';
    }

    execute(params) {
        this.emit(this.sendMessageEvent, this.appendText);
    }
}

export default AppendTextAction;