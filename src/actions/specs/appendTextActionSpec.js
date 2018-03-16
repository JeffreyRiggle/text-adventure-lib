import { AppendTextAction } from '../appendTextAction';

describe('AppendTextAction', function() {
    var action, text, messageValue;

    beforeEach(function() {
        text = 'test';
        action = new AppendTextAction(text);

        action.on(action.sendMessageEvent, function(text) {
            messageValue = text;
        });
    });

    describe('when execute is called', function() {
        beforeEach(function() {
            action.execute({});
        });

        it('should raise a message sent event', function() {
            expect(messageValue).toBe(text);
        });
    });
});