import FinishAction from '../finishAction';

describe('FinishAction', function() {
    var action, callCount;

    beforeEach(function() {
        callCount = 0;
        action = new FinishAction();

        action.on(action.finishedEvent, function() {
            callCount++;
        });
    });

    describe('when execute is called', function() {
        beforeEach(function() {
            action.execute({});
        });

        it('should raise a finished event', function() {
            expect(callCount).toBe(1);
        });
    });
});