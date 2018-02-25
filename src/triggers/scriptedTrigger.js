class ScriptedTrigger {
    constructor(script) {
        this.script = eval(script);
    }

    shouldFire(data) {
        return this.script.shouldFire(data);
    }
}

export default ScriptedTrigger;