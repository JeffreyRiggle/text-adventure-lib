import { OptionPersistenceObject } from '../optionPersistenceObject';

describe('OptionPersistenceObject', function() {
    var persist, obj, ttext, matchType, cs, atext;

    beforeEach(function() {
        ttext = 'TriggerText';
        matchType = 'Exact';
        cs = 'true';
        atext = 'ActionText';

        var tm = new Map();
        tm.set('type', 'Text');
        var am = new Map();
        am.set('type', 'AppendText');

        persist = {
            children: [
                {
                    name: 'Triggers',
                    children: [
                        {
                            name: 'Trigger',
                            properties: tm,
                            children: [
                                {
                                    name: 'Parameters',
                                    children: [
                                        {
                                            name: 'Text',
                                            value: ttext
                                        },
                                        {
                                            name: 'MatchType',
                                            value: matchType
                                        },
                                        {
                                            name: 'CaseSensitive',
                                            value: cs
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Action',
                    properties: am,
                    children: [
                        {
                            name: 'Parameters',
                            children: [
                                {
                                    name: 'AppendText',
                                    value: atext
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        obj = new OptionPersistenceObject();
    });

    describe('when the object loaded from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have the correct action', function() {
            expect(obj.action.appendText).toBe(atext);
        });

        it('should have the correct triggers', function() {
            expect(obj.triggers.length).toBe(1);
        });

        describe('when the object is converted to an option', function() {
            var option;

            beforeEach(function() {
                option = obj.convertToOption();
            });

            it('should have the correct action', function() {
                expect(option.action.sendMessageEvent).toBeDefined();
                expect(option.action.appendText).toBe(atext);
            });
    
            it('should have the correct triggers', function() {
                expect(option.triggers.length).toBe(1);
            });
        });
    });
});