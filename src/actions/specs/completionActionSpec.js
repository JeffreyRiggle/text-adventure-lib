import { CompletionAction } from '../completionAction';

describe('CompletionAction', function() {
    var action, data, dataValue;

    beforeEach(function() {
        data = {state: 'test'};
        action = new CompletionAction(data);

        action.on(action.completionEvent, function(data) {
            dataValue = data;
        });
    });

    describe('when execute is called', function() {
        beforeEach(function() {
            action.execute({});
        });

        it('should raise a completion event', function() {
            expect(dataValue).toBe(data);
        });
    });
});