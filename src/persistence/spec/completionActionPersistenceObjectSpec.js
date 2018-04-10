import {CompletionActionPersistenceObject} from '../completionActionPersistenceObject';

describe('CompletionActionPersistenceObject', function() {
    var obj, persist, completion;

    beforeEach(function() {
        completion = 'testcomp';

        persist = {
            children: [
                {
                    name: 'Parameters',
                    children: [
                        {
                            name: 'CompletionData',
                            value: completion
                        }
                    ]
                }
            ]
        };

        obj = new CompletionActionPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have completion data', function() {
            expect(obj.completionData).toBe(completion);
        });

        describe('when object is converted to action', function() {
            var action;

            beforeEach(function() {
                action = obj.convertToAction();
            });

            it('the action should have completion data', function() {
                expect(action.data).toBe(completion);
            });
        });
    });
});