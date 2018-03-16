export class ScriptedAction {
    constructor(script) {
        this.script = eval(script);
    }

    execute(params) {
        this.script.execute(params);
    }
}