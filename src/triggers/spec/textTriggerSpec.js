import { TextTrigger } from '../textTrigger';

describe('TextTrigger', function() {
    var trigger, condition;

    beforeEach(function() {
        condition = /.*test.*/i;
        trigger = new TextTrigger(condition);
    });

    it('should have the right condition', function() {
        expect(trigger.condition).toBe(condition);
    });

    describe('when a message not matching is evaluated', function() {
        var result;

        beforeEach(function() {
            result = trigger.shouldFire({
                message: 'foobar'
            });
        });

        it('should not fire', function() {
            expect(result).toBe(false);
        });
    });

    describe('when a message matching is evaluated', function() {
        var result;

        beforeEach(function() {
            result = trigger.shouldFire({
                message: 'myTest'
            });
        });

        it('should fire', function() {
            expect(result).toBe(true);
        });
    });
});