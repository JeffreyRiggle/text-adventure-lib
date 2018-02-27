import PlayerTrigger from "../playerTrigger";

// TODO finish this out
describe('PlayerTrigger', function() {
    var triggerData, runData, trigger, player1, player2, result1, result2;

    beforeEach(function() {
        player1 = {
            name: 'player1',
            attributes: [
                {
                    name: 'Age',
                    value: 12
                }
            ],
            characteristics: [
                {
                    name: 'Height',
                    value: 90
                },
                {
                    name: 'HairColor',
                    value: 'Blue'
                }
            ],
            bodyParts: [
                {
                    name: 'Head',
                    characteristics: [
                        {
                            name: 'HairColor',
                            value: 'Blue'
                        },
                        {
                            name: 'Size',
                            value: 4
                        }
                    ]
                }
            ],
            inventory: {
                items: [
                    {
                        name: 'Potion',
                        properties: [
                            {
                                name: 'Restore',
                                value: 4
                            }
                        ]
                    }
                ]
            }
        };

        player2 = {
            name: 'player2'
        };

        triggerData = {};

        runData = {
            message: 'test',
            players: [player1, player2]
        };
    });

    describe('when modification object is attribute', function() {
        beforeEach(function() {
            triggerData.modificationObject = 'Attribute';
        });

        describe('when condition is greater than', function() {
            beforeEach(function() {
                triggerData.condition = 'GreaterThan';
                triggerData.id = ['Age'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 21;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.attributes[0].value = 22;

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when age is under 21', function() {
                expect(result1).toBe(false);
            });

            it('should fire when age is over 21', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is less than', function() {
            beforeEach(function() {
                triggerData.condition = 'LessThan';
                triggerData.id = ['Age'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 21;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.attributes[0].value = 22;

                result2 = trigger.shouldFire(runData);
            });

            it('should fire when age is under 21', function() {
                expect(result1).toBe(true);
            });

            it('should not fire when age is over 21', function() {
                expect(result2).toBe(false);
            });
        });

        describe('when condition is equal to', function() {
            beforeEach(function() {
                triggerData.condition = 'EqualTo';
                triggerData.id = ['Age'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 12;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.attributes[0].value = 21;

                result2 = trigger.shouldFire(runData);
            });

            it('should fire when age is 12', function() {
                expect(result1).toBe(true);
            });

            it('should not fire when age is 21', function() {
                expect(result2).toBe(false);
            });
        });

        describe('when condition is not equal', function() {
            beforeEach(function() {
                triggerData.condition = 'NotEqual';
                triggerData.id = ['Age'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 12;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.attributes[0].value = 21;

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when age is 12', function() {
                expect(result1).toBe(false);
            });

            it('should fire when age is 21', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is has', function() {
            beforeEach(function() {
                triggerData.condition = 'Has';
                triggerData.id = ['HP'];

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.attributes.push({
                    name: 'HP',
                    value: 100
                });

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when player does not have HP', function() {
                expect(result1).toBe(false);
            });

            it('should fire when player has HP', function() {
                expect(result2).toBe(true);
            });
        });
    });

    describe('when modification object is characteristic', function() {
        beforeEach(function() {
            triggerData.modificationObject = 'Characteristic';
        });

        describe('when condition is greater than', function() {
            beforeEach(function() {
                triggerData.condition = 'GreaterThan';
                triggerData.id = ['Height'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 100;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.characteristics[0].value = 180;

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when height is under 100cm', function() {
                expect(result1).toBe(false);
            });

            it('should fire when height is over 100cm', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is less than', function() {
            beforeEach(function() {
                triggerData.condition = 'GreaterThan';
                triggerData.id = ['Height'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 100;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.characteristics[0].value = 180;

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when height is under 100cm', function() {
                expect(result1).toBe(false);
            });

            it('should fire when height is over 100cm', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is equal to', function() {
            beforeEach(function() {
                triggerData.condition = 'EqualTo';
                triggerData.id = ['HairColor'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 'Blue';

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.characteristics[1].value = 'Brown';

                result2 = trigger.shouldFire(runData);
            });

            it('should fire when hair color is blue', function() {
                expect(result1).toBe(true);
            });

            it('should not fire when hair color is brown', function() {
                expect(result2).toBe(false);
            });
        });

        describe('when condition is not equal', function() {
            beforeEach(function() {
                triggerData.condition = 'NotEqual';
                triggerData.id = ['HairColor'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 'Blue';

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.characteristics[1].value = 'Brown';

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when hair color is blue', function() {
                expect(result1).toBe(false);
            });

            it('should fire when hair color is brown', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is has', function() {
            beforeEach(function() {
                triggerData.condition = 'Has';
                triggerData.id = ['SkinColor'];

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.characteristics.push({
                    name: 'SkinColor',
                    value: 'Green'
                });

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when player does not have skin color', function() {
                expect(result1).toBe(false);
            });

            it('should fire when player has skin color', function() {
                expect(result2).toBe(true);
            });
        });
    });

    describe('when modification object is body part', function() {
        beforeEach(function() {
            triggerData.modificationObject = 'BodyPart';
        });

        describe('when condition is greater than', function() {
            beforeEach(function() {
                triggerData.condition = 'GreaterThan';
                triggerData.id = ['Head', 'Size'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 5;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.bodyParts[0].characteristics[1].value = 6;

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when size is under 5', function() {
                expect(result1).toBe(false);
            });

            it('should fire when size is over 5', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is less than', function() {
            beforeEach(function() {
                triggerData.condition = 'GreaterThan';
                triggerData.id = ['Head', 'Size'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 5;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.bodyParts[0].characteristics[1].value = 6;

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when size is under 5', function() {
                expect(result1).toBe(false);
            });

            it('should fire when size is over 5', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is equal to', function() {
            beforeEach(function() {
                triggerData.condition = 'EqualTo';
                triggerData.id = ['Head', 'HairColor'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 'Blue';

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.bodyParts[0].characteristics[0].value = 'Brown';

                result2 = trigger.shouldFire(runData);
            });

            it('should fire when hair color is blue', function() {
                expect(result1).toBe(true);
            });

            it('should not fire when hair color is brown', function() {
                expect(result2).toBe(false);
            });
        });

        describe('when condition is not equal', function() {
            beforeEach(function() {
                triggerData.condition = 'NotEqual';
                triggerData.id = ['Head', 'HairColor'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 'Blue';

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.bodyParts[0].characteristics[0].value = 'Brown';

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when hair color is blue', function() {
                expect(result1).toBe(false);
            });

            it('should fire when hair color is brown', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is has', function() {
            beforeEach(function() {
                triggerData.condition = 'Has';
                triggerData.id = ['Foot'];

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.bodyParts.push({
                    name: 'Foot'
                });

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when player does not have foot', function() {
                expect(result1).toBe(false);
            });

            it('should fire when player has foot', function() {
                expect(result2).toBe(true);
            });
        });
    });

    describe('when modification object is player', function() {
        beforeEach(function() {
            triggerData.modificationObject = 'Player';
        });

        describe('when condition is equal to', function() {
            beforeEach(function() {
                triggerData.condition = 'EqualTo';
                triggerData.comparisonData = JSON.parse(JSON.stringify(player1));

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                runData.players[0].bodyParts = [];

                result2 = trigger.shouldFire(runData);
            });

            it('should fire when player is equal', function() {
                expect(result1).toBe(true);
            });

            it('should not fire when player is not equal', function() {
                expect(result2).toBe(false);
            });
        });

        describe('when condition is not equal', function() {
            beforeEach(function() {
                triggerData.condition = 'NotEqual';
                triggerData.comparisonData = JSON.parse(JSON.stringify(player1));

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                runData.players[0].bodyParts = [];

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when player is equal', function() {
                expect(result1).toBe(false);
            });

            it('should fire when player is not equal', function() {
                expect(result2).toBe(true);
            });
        });
    });

    describe('when modification object is inventory', function() {
        beforeEach(function() {
            triggerData.modificationObject = 'Inventory';
        });

        describe('when condition is greater than', function() {
            beforeEach(function() {
                triggerData.condition = 'GreaterThan';
                triggerData.id = ['Potion', 'Restore'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 5;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.inventory.items[0].properties[0].value = 6;

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when restore is under 5', function() {
                expect(result1).toBe(false);
            });

            it('should fire when restore is over 5', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is less than', function() {
            beforeEach(function() {
                triggerData.condition = 'LessThan';
                triggerData.id = ['Potion', 'Restore'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 5;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.inventory.items[0].properties[0].value = 6;

                result2 = trigger.shouldFire(runData);
            });

            it('should fire when restore is under 5', function() {
                expect(result1).toBe(true);
            });

            it('should not fire when restore is over 5', function() {
                expect(result2).toBe(false);
            });
        });

        describe('when condition is equal to', function() {
            beforeEach(function() {
                triggerData.condition = 'EqualTo';
                triggerData.id = ['Potion', 'Restore'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 4;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.inventory.items[0].properties[0].value = 6;

                result2 = trigger.shouldFire(runData);
            });

            it('should fire when restore is 4', function() {
                expect(result1).toBe(true);
            });

            it('should not fire when restore is 6', function() {
                expect(result2).toBe(false);
            });
        });

        describe('when condition is not equal', function() {
            beforeEach(function() {
                triggerData.condition = 'NotEqual';
                triggerData.id = ['Potion', 'Restore'];
                triggerData.dataMember = 'value';
                triggerData.comparisonData = 4;

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.inventory.items[0].properties[0].value = 6;

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when restore is 4', function() {
                expect(result1).toBe(false);
            });

            it('should fire when restore is 6', function() {
                expect(result2).toBe(true);
            });
        });

        describe('when condition is has', function() {
            beforeEach(function() {
                triggerData.condition = 'Has';
                triggerData.id = ['Ether'];

                trigger = new PlayerTrigger(player1.name, triggerData);

                result1 = trigger.shouldFire(runData);

                player1.inventory.items.push({
                    name: 'Ether'
                });

                result2 = trigger.shouldFire(runData);
            });

            it('should not fire when player does not have Ether', function() {
                expect(result1).toBe(false);
            });

            it('should fire when player has Ether', function() {
                expect(result2).toBe(true);
            });
        });
    });
});