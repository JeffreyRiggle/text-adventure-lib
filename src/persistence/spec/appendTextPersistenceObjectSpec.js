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

        describe('when object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name', function() {
                expect(config.name).toEqual('Action');
            });

            it('should have the correct type', function() {
                expect(config.properties.get('type')).toEqual('AppendText');
            });

            it('should have parameters', function() {
                expect(config.children.length).toBe(1);
                expect(config.children[0].name).toEqual('Parameters');
                expect(config.children[0].children.length).toBe(1);
                expect(config.children[0].children[0].name).toEqual('AppendText');
                expect(config.children[0].children[0].value).toEqual(text);
            });
        });
    });
});