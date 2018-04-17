import {CompletionTimerPersistenceObject} from '../completionTimerPersistenceObject'

describe('CompletionTimerPersistenceObject', function() {
    var duration, completionData, timer, persist, obj;

    beforeEach(function() {
        completionData = 'teststate';
        duration = 1000;

        let pm = new Map();
        pm.set('type', 'Completion');

        persist = {
            properties: pm,
            children: [
                {
                    name: 'CompletionData',
                    value: completionData
                },
                {
                    name: 'Duration',
                    value: duration + ''
                }
            ]
        };

        obj = new CompletionTimerPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have the correct completion data', function() {
            expect(obj.completionData).toBe(completionData);
        });

        it('should have the correct duration', function() {
            expect(obj.duration).toBe(duration);
        });

        describe('when object is converted to a timer', function() {
            var timer;

            beforeEach(function() {
                timer = obj.convertToTimer();
            });

            it('should have the correct action', function() {
                expect(timer.action.completionEvent).toBeDefined();
            });

            it('should have the correct duration', function() {
                expect(timer.duration).toBe(duration);
            });
        });
    });
});