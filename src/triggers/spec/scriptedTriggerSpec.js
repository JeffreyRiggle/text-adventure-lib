import ScriptedTrigger from "../scriptedTrigger";

describe('ScriptedTrigger', function() {
    var script, trigger, data, result;

    beforeEach(function() {
        script = '(function() { function shouldFire(data) { if (data.message === \'test\') { return true; } return false; } return { shouldFire: shouldFire }})()';
        trigger = new ScriptedTrigger(script);
    });

    describe('when passing data is used', function() {
        beforeEach(function() {
            data = {
                message: 'test'
            };

            result = trigger.shouldFire(data);
        });

        it('should return a passing value', function() {
            expect(result).toBe(true);
        });
    });

    describe('when failing data is used', function() {
        beforeEach(function() {
            data = {
                message: 'foo'
            };

            result = trigger.shouldFire(data);
        });

        it('should return a failing value', function() {
            expect(result).toBe(false);
        });
    });
});