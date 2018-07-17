import {PlayerTriggerPersistenceObject} from '../playerTriggerPersistenceObject';

describe('PlayerTriggerPersistenceObject', function() {
    var persistence, obj, modificationObject, id, condition, datamember, comparisonData, playerName;

    beforeEach(function() {
        modificationObject = 'Attribute';
        id = 'Age';
        condition = 'EqualTo';
        datamember = 'value';
        comparisonData = '13';
        playerName = 'test';

        let pm = new Map();
        pm.set('ValueType', 'int');

        persistence = {
            children: [
                {
                    name: 'Parameters',
                    children: [
                        {
                            name: 'ModificationObject',
                            value: modificationObject
                        },
                        {
                            name: 'ID',
                            value: id
                        },
                        {
                            name: 'Condition',
                            value: condition
                        },
                        {
                            name: 'DataMember',
                            value: datamember
                        },
                        {
                            name: 'ComparisionData',
                            properties: pm,
                            value: comparisonData
                        },
                        {
                            name: 'PlayerName',
                            value: playerName
                        }
                    ]
                }
            ]
        };

        obj = new PlayerTriggerPersistenceObject();
    });

    describe('when persistence is converted', function() {

        beforeEach(function() {
            obj.convertFromPersistence(persistence);
        });

        it('should have the correct modification object', function() {
            expect(obj.modificationObject).toBe(modificationObject);
        });

        it('should have the correct id', function() {
            expect(obj.id).toEqual([id]);
        });

        it('should have the correct condition', function() {
            expect(obj.condition).toBe(condition);
        });

        it('should have the correct data member', function() {
            expect(obj.dataMember).toBe(datamember);
        });
        
        it('should have the correct comparison data', function() {
            expect(obj.comparisonData).toBe(13);
        });
        
        it('should have the correct player name', function() {
            expect(obj.playerName).toBe(playerName);
        });

        describe('when object is converted into a trigger', function() {
            var trigger, data, player;

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
                    message: 'filter',
                    players: [player]
                };
            });

            it('should have the correct expression', function() {
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
                expect(config.properties.get('type')).toEqual('Player');
            });

            it('should have parameters', function() {
                expect(config.children.length).toBe(1);
                expect(config.children[0].name).toEqual('Parameters');
                expect(config.children[0].children.length).toBe(6);
                expect(config.children[0].children[0].name).toEqual('PlayerName');
                expect(config.children[0].children[0].value).toEqual(playerName);
                expect(config.children[0].children[1].name).toEqual('ModificationObject');
                expect(config.children[0].children[1].value).toEqual(modificationObject);
                expect(config.children[0].children[2].name).toEqual('ID');
                expect(config.children[0].children[2].value).toEqual(id);
                expect(config.children[0].children[3].name).toEqual('Condition');
                expect(config.children[0].children[3].value).toEqual(condition);
                expect(config.children[0].children[4].name).toEqual('DataMember');
                expect(config.children[0].children[4].value).toEqual(datamember);
                expect(config.children[0].children[5].name).toEqual('ComparisionData');
                expect(config.children[0].children[5].value).toEqual(comparisonData);
            });
        });
    });
});