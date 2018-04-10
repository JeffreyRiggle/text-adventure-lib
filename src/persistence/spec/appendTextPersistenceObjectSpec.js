import {AppendTextPersistenceObject} from '../appendTextPersistenceObject';

describe('AppendTextPersistenceObject', function() {
    var obj, persist, text;

    beforeEach(function() {
        text = 'test text';

        persist = {
            children: [
                {
                    name: 'Parameters',
                    children: [
                        {
                            name: 'AppendText',
                            value: text
                        }
                    ]
                }
            ]
        };

        obj = new AppendTextPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have append text', function() {
            expect(obj.appendText).toBe(text);
        });

        describe('when object is converted to action', function() {
            var action;

            beforeEach(function() {
                action = obj.convertToAction();
            });

            it('the action should have append text', function() {
                expect(action.appendText).toBe(text);
            });
        });
    });
});