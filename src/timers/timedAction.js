export class TimedAction {
    constructor(action, duration) {
        this.action = action;
        this.duration = duration;
    }

    start() {
        this.timer = setInterval(() => {
            this.action.execute();
        }, this.duration)
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}