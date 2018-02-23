import MultiPartTrigger from '../multiPartTrigger';
import TextTrigger from '../textTrigger';

describe('MultiPartTrigger', function() {
    var mpTrigger, trigger1, trigger2;

    beforeEach(function() {
        trigger1 = new TextTrigger(/.*test.*/i);
        trigger2 = new TextTrigger(/.*foo.*/i);

        mpTrigger = new MultiPartTrigger([trigger1, trigger2]);
    });

    describe('when should trigger is called', function() {
        var result;

        describe('and only the first trigger passes', function() {
            beforeEach(function() {
                result = mpTrigger.shouldFire({
                    message: 'this is a test'
                });
            });

            it('should not fire', function() {
                expect(result).toBe(false);
            });
        });

        describe('and only the second trigger passes', function() {
            beforeEach(function() {
                result = mpTrigger.shouldFire({
                    message: 'this is foo'
                });
            });

            it('should not fire', function() {
                expect(result).toBe(false);
            });
        });

        describe('and both triggers pass', function() {
            beforeEach(function() {
                result = mpTrigger.shouldFire({
                    message: 'this is foo test'
                });
            });

            it('should not fire', function() {
                expect(result).toBe(true);
            });
        });
    });
});