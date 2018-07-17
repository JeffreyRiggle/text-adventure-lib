import {MultiPartTriggerPersistenceObject} from '../multiPartTriggerPersistenceObject';

describe('MultiPartTriggerPersistenceObject', function() {
    var obj, trig1, trig2, persist;

    beforeEach(function() {
        let t1pm = new Map();
        t1pm.set('type', 'Text');

        trig1 = {
            name: 'Trigger',
            properties: t1pm,
            children: [
                {
                    name: 'Parameters',
                    children: [
                        {
                            name: 'Text',
                            value: 'test'
                        },
                        {
                            name: 'MatchType',
                            value: 'Contains'
                        },
                        {
                            name: 'CaseSensitive',
                            value: 'False'
                        }
                    ]
                }
            ]
        };

        let t2pm = new Map();
        t2pm.set('type', 'Player');
        let pm = new Map();
        pm.set('ValueType', 'int');

        trig2 = {
            name: 'Trigger',
            properties: t2pm,
            children: [
                {
                    name: 'Parameters',
                    children: [
                        {
                            name: 'ModificationObject',
                            value: 'Attribute'
                        },
                        {
                            name: 'ID',
                            value: 'Age'
                        },
                        {
                            name: 'Condition',
                            value: 'EqualTo'
                        },
                        {
                            name: 'DataMember',
                            value: 'value'
                        },
                        {
                            name: 'ComparisionData',
                            properties: pm,
                            value: '13'
                        },
                        {
                            name: 'PlayerName',
                            value: 'test'
                        }
                    ]
                }
            ]
        };

        persist = {
            children: [
                {
                    name: 'Parameters',
                    children: [trig1, trig2]
                }
            ]
        };

        obj = new MultiPartTriggerPersistenceObject();
    });

    describe('when trigger is loaded from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have the correct number of triggers', function() {
            expect(obj.triggers.length).toBe(2);
        });

        describe('when persistence is converted to trigger', function() {
            var trigger, player, data;

            beforeEach(function() {
                trigger = obj.convertToTrigger();

                player = {
                    name: 'test',
                    attributes: [
                        {
                            name: 'Age',
                            value: 13
                        }
                    ]
                };

                data = {
                    message: 'test',
                    players: [player]
                };
            });

            it('should have the correct should fire logic', function() {
                expect(trigger.shouldFire(data)).toBe(true);
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
                expect(config.properties.get('type')).toEqual('MultiPart');
            });

            it('should have parameters', function() {
                expect(config.children.length).toBe(1);
                expect(config.children[0].name).toEqual('Parameters');
                expect(config.children[0].children.length).toBe(1);
                expect(config.children[0].children[0].name).toEqual('Triggers');
                expect(config.children[0].children[0].children.length).toBe(2);
            });
        });
    });
});