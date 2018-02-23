class TextTrigger {
    constructor(expression) {
        this.condition = expression;
    }

    shouldFire(data) {
        return this.condition.test(data.message);
    }
}

export default TextTrigger;