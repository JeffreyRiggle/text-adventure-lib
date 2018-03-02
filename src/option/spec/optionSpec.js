import Option from '../option';

describe('Option', function() {
    var option, trigger1, trigger2, t1Pass, t2Pass, action, result;

    beforeEach(function() {
        t1Pass = t2Pass = false;

        trigger1 = {
            shouldFire: function() {
                return t1Pass;
            }
        };

        trigger2 = {
            shouldFire: function() {
                return t2Pass;
            }
        };

        action = {};

        option = new Option([trigger1, trigger2], action);
    });

    it('should have triggers', function() {
        expect(option.triggers.length).toBe(2);
    });

    it('should have an action', function() {
        expect(option.action).toBe(action);
    });

    describe('when no triggers pass', function() {
        beforeEach(function() {
            result = option.shouldTrigger({});
        });

        it('should not fire', function() {
            expect(result).toBe(false);
        });
    });

    describe('when one trigger passes', function() {
        beforeEach(function() {
            t2Pass = true;
            result = option.shouldTrigger({});
        });

        it('should fire', function() {
            expect(result).toBe(true);
        });
    });
});