import { GameState } from '../../node_modules/gamestate-manager/dist/main';

export class TextAdventureGameState extends GameState {
    constructor(layout, options, timers, macros) {
        super();

        this.layout = layout;
        this.options = options;
        this.timers = timers;
        this.macros = macros;
        this.players = [];

        this.sendMessageNoProcessing = this._sendMessageNoProcessing.bind(this);
        this.completed = this._completed.bind(this);
        this.onFinished = this._onFinished.bind(this);
    }

    sendMessage(message) {
        let triggerParams = { message: message, players: this.players };
        let exeParams = { players: this.players, currentGameState: this.stateId };

        for (let option of this.options) {
            if (option.shouldTrigger(triggerParams)) {
                option.action.execute(exeParams);
                return;
            }
        }
    }

    _sendMessageNoProcessing(message) {
        this.textLog = this.layout.textLog + '\n' + message;
    }

    get textLog() {
        return this.layout.textLog;
    }

    set textLog(value) {
        this.layout.textLog = value;
        this.preformSubstitution();
    }

    preformSubstitution() {
        for (let macro of this.macros) {
            this.layout.textLog = macro.substitute(this.layout.textLog);
        }
    }

    setupListeners() {
        for (let option of this.options) {
            if (option.action.sendMessageEvent) {
                option.action.on(option.action.sendMessageEvent, this.sendMessageNoProcessing);
            }

            if (option.action.completionEvent) {
                option.action.on(option.action.completionEvent, this.completed);
            }

            if (option.action.finishedEvent) {
                option.action.on(option.action.finishedEvent, this.onFinished);
            }
        }

        this.layout.messageCallback = this.sendMessage.bind(this);
    }

    teardownListeners() {
        for (let option of this.options) {
            if (option.action.sendMessageEvent) {
                option.action.removeListener(option.action.sendMessageEvent, this.sendMessageNoProcessing);
            }

            if (option.action.completionEvent) {
                option.action.removeListener(option.action.completionEvent, this.completed);
            }

            if (option.action.finishedEvent) {
                option.action.removeListener(option.action.finishedEvent, this.onFinished);
            }
        }
    }

    run(data) {
        this.players = data.players;
        this.stateId = data.currentGameState;

        this.updateMacros();
        if (data.textLog) {
            this.textLog = data.textLog + '\n' + this.textLog;
        }

        this.layout.animate();
        this.setupListeners();
        this.startTimers();
    }

    updateMacros() {
        for (let macro of this.macros) {
            if (macro.players) {
                macro.players = this.players;
            }
        }
    }

    _completed(data) {
        this.stateCompleted({state: data, textLog: this.textLog});
        this.layout.suspend();
        this.teardownListeners();
        this.stopTimers();
    }

    startTimers() {
        for (let timer of this.timers) {
            timer.start();
        }
    }

    stopTimers() {
        for (let timer of this.timers) {
            timer.stop();
        }
    }

    _onFinished() {
        this.layout.suspend();
        this.finish();
    }
}