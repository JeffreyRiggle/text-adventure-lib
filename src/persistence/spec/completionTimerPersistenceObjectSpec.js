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

        describe('when object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name', function() {
                expect(config.name).toEqual('Timer');
            });

            it('should have the correct type', function() {
                expect(config.properties.get('type')).toEqual('Completion');
            });

            it('should have parameters', function() {
                expect(config.children.length).toBe(2);
                expect(config.children[0].name).toEqual('CompletionData');
                expect(config.children[0].value).toEqual(completionData);
                expect(config.children[1].name).toEqual('Duration');
                expect(config.children[1].value).toEqual('1000');
            });
        });
    });
});