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

        describe('when object is converted to config', function() {
            var config;
    
            beforeEach(function() {
                config = obj.convertToConfig();
            });
    
            it('should have the correct name', function() {
                expect(config.name).toEqual('Action');
            });
    
            it('should have the correct type', function() {
                expect(config.properties.get('type')).toEqual('Completion');
            });
    
            it('should have parameters', function() {
                expect(config.children.length).toBe(1);
                expect(config.children[0].name).toEqual('Parameters');
                expect(config.children[0].children.length).toBe(1);
                expect(config.children[0].children[0].name).toEqual('CompletionData');
                expect(config.children[0].children[0].value).toEqual(completion);
            });
        });
    });
});