import {TextTriggerPersistenceObject} from '../textTriggerPersistenceObject';

describe('TextTriggerPersistenceObject', function() {
    var persistence, obj, text, matchType, caseSensitive;

    beforeEach(function() {
        text = 'filter';
        matchType = 'Contains';
        caseSensitive = 'False';

        persistence = {
            children: [
                {
                    name: 'Parameters',
                    children: [
                        {
                            name: 'Text',
                            value: text
                        },
                        {
                            name: 'MatchType',
                            value: matchType
                        },
                        {
                            name: 'CaseSensitive',
                            value: caseSensitive
                        }
                    ]
                }
            ]
        };

        obj = new TextTriggerPersistenceObject();
    });

    describe('when persistence is converted', function() {

        beforeEach(function() {
            obj.convertFromPersistence(persistence);
        });

        it('should have the correct match type', function() {
            expect(obj.matchType).toBe(matchType);
        });

        it('should have the correct text', function() {
            expect(obj.text).toBe(text);
        });

        it('should have the correct case sensitivity', function() {
            expect(obj.caseSensitive).toBe(false);
        });

        describe('when object is converted into a trigger', function() {
            var trigger, data;

            describe('and the type is exact', function() {
                beforeEach(function() {
                    obj.matchType = 'Exact';
                    trigger = obj.convertToTrigger();

                    data = {
                        message: 'filter'
                    };
                });

                it('should have the correct expression', function() {
                    expect(trigger.shouldFire(data)).toBe(true);
                });
            });

            describe('and the type is prefix', function() {
                beforeEach(function() {
                    obj.matchType = 'Prefix';
                    trigger = obj.convertToTrigger();

                    data = {
                        message: 'filter testing test'
                    };
                });

                it('should have the correct expression', function() {
                    expect(trigger.shouldFire(data)).toBe(true);
                });
            });

            describe('and the type is postfix', function() {
                beforeEach(function() {
                    obj.matchType = 'Prefix';
                    trigger = obj.convertToTrigger();

                    data = {
                        message: 'testing test filter'
                    };
                });

                it('should have the correct expression', function() {
                    expect(trigger.shouldFire(data)).toBe(true);
                });
            });

            describe('and the type is contains', function() {
                beforeEach(function() {
                    obj.matchType = 'Prefix';
                    trigger = obj.convertToTrigger();

                    data = {
                        message: 'testing test filter testing test'
                    };
                });

                it('should have the correct expression', function() {
                    expect(trigger.shouldFire(data)).toBe(true);
                });
            });

            describe('and the type is not contains', function() {
                beforeEach(function() {
                    obj.matchType = 'NotContains';
                    trigger = obj.convertToTrigger();

                    data = {
                        message: 'testing test'
                    };
                });

                it('should have the correct expression', function() {
                    expect(trigger.shouldFire(data)).toBe(true);
                });
            });

            describe('and the expression is case sensitive', function() {
                beforeEach(function() {
                    obj.matchType = 'Contains';
                    obj.caseSensitive = true;
                    trigger = obj.convertToTrigger();

                    data = {
                        message: 'FILTER'
                    };
                });

                it('should have the correct expression', function() {
                    expect(trigger.shouldFire(data)).toBe(false);
                });
            });
        });

        describe('when object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name', function() {
                expect(config.name).toEqual('Trigger');
            });

            it('should have the correct type', function() {
                expect(config.properties.get('type')).toEqual('Text');
            });

            it('should have parameters', function() {
                expect(config.children.length).toBe(1);
                expect(config.children[0].name).toEqual('Parameters');
                expect(config.children[0].children.length).toBe(3);
                expect(config.children[0].children[0].name).toEqual('Text');
                expect(config.children[0].children[0].value).toEqual(text);
                expect(config.children[0].children[1].name).toEqual('MatchType');
                expect(config.children[0].children[1].value).toEqual(matchType);
                expect(config.children[0].children[2].name).toEqual('CaseSensitive');
                expect(config.children[0].children[2].value).toEqual('false');
            });
        });
    });
});