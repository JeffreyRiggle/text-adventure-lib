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
    });
});