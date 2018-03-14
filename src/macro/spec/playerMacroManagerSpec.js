import PlayerMacroManager from '../playerMacroManager';

describe('PlayerMacroManager', function() {
    var parameters, 
        manager, 
        players, 
        player1,
        attribute,
        characteristic,
        item1,
        bodypart1,
        input, 
        output, 
        expectedOutput;

    beforeEach(function() {
        parameters = {
            prefix: '\\{\\[',
            suffix: '\\]\\}',
            parameterPrefix: '\\(',
            parameterSuffix: '\\)',
            separator: '@'
        };

        item1 = {
            name: 'testitem',
            description: 'a super cool item',
            properties: [
                {
                    name: 'testprop',
                    value: 'test property value'
                }
            ]
        };

        characteristic = {
            name: 'testchr',
            value: 'test2value',
            description: 'a really cool characteristic'
        };

        bodypart1 = {
            name: 'testpart',
            description: 'a really cool part',
            characteristics: [characteristic]
        };

        attribute = {
            name: 'testattrib',
            value: 'testvalue',
            description: 'a really cool attribute'
        };

        player1 = {
            name: 'john',
            attributes: [attribute],
            characteristics: [characteristic],
            bodyParts: [bodypart1],
            inventory: {
                items: [item1]
            },
            equipment: {
                equip: new Map(),
                equiped: function(part) {
                    return this.equip.get(part);
                }
            }
        };

        players = [player1];

        player1.equipment.equip.set(bodypart1, item1);
        manager = new PlayerMacroManager(parameters);
        manager.players = players;
    });

    describe('when no macro is provided', function() {
        beforeEach(function() {
            input = 'This is a test';
            output = manager.substitute(input);
        });

        it('should not modify the input', function() {
            expect(output).toBe(input);
        });
    });

    describe('when macro replacement is player name', function() {
        beforeEach(function() {
            input = 'This is {[player(john)@name]}';
            expectedOutput = 'This is john';
            output = manager.substitute(input);
        });

        it('should update the macro with the player name', function() {
            expect(output).toBe(expectedOutput);
        });
    });

    describe('when macro replacement is inventory', function() {
        describe('when macro replacement is item description', function() {
            beforeEach(function() {
                input = 'This item is {[player(john)@inventory(testitem)@description]}';
                expectedOutput = 'This item is a super cool item';
                output = manager.substitute(input);
            });

            it('should update the macro with the item description', function() {
                expect(output).toBe(expectedOutput);
            });
        });

        describe('when macro replacement is item property', function() {
            beforeEach(function() {
                input = 'This item property is {[player(john)@inventory(testitem)@property(testprop)@value]}';
                expectedOutput = 'This item property is test property value';
                output = manager.substitute(input);
            });

            it('should update the macro with the property value', function() {
                expect(output).toBe(expectedOutput);
            });
        });
    });
    
    describe('when macro replacement is equipment', function() {
        describe('when macro replacement is item description', function() {
            beforeEach(function() {
                input = 'This item is {[player(john)@equipment(testpart)@description]}';
                expectedOutput = 'This item is a super cool item';
                output = manager.substitute(input);
            });

            it('should update the macro with the item description', function() {
                expect(output).toBe(expectedOutput);
            });
        });

        describe('when macro replacement is item property', function() {
            beforeEach(function() {
                input = 'This item property is {[player(john)@equipment(testpart)@property(testprop)@value]}';
                expectedOutput = 'This item property is test property value';
                output = manager.substitute(input);
            });

            it('should update the macro with the property value', function() {
                expect(output).toBe(expectedOutput);
            });
        });
    });

    describe('when macro replacement is attribute', function() {
        describe('and replacement is value', function() {
            beforeEach(function() {
                input = 'This attribute is {[player(john)@attribute(testattrib)@value]}';
                expectedOutput = 'This attribute is testvalue';
                output = manager.substitute(input);
            });

            it('should update the macro with the attribute value', function() {
                expect(output).toBe(expectedOutput);
            });
        });

        describe('and replacement is description', function() {
            beforeEach(function() {
                input = 'This attribute is {[player(john)@attribute(testattrib)@description]}';
                expectedOutput = 'This attribute is a really cool attribute';
                output = manager.substitute(input);
            });

            it('should update the macro with the attribute description', function() {
                expect(output).toBe(expectedOutput);
            });
        });
    });

    describe('when macro replacement is characteristic', function() {
        describe('and replacement is value', function() {
            beforeEach(function() {
                input = 'This characteristic is {[player(john)@characteristic(testchr)@value]}';
                expectedOutput = 'This characteristic is test2value';
                output = manager.substitute(input);
            });

            it('should update the macro with the characteristic value', function() {
                expect(output).toBe(expectedOutput);
            });
        });

        describe('and replacement is description', function() {
            beforeEach(function() {
                input = 'This characteristic is {[player(john)@characteristic(testchr)@description]}';
                expectedOutput = 'This characteristic is a really cool characteristic';
                output = manager.substitute(input);
            });

            it('should update the macro with the characteristic description', function() {
                expect(output).toBe(expectedOutput);
            });
        });
    });

    describe('when macro replacement is body part', function() {
        describe('and replacement is description', function() {
            beforeEach(function() {
                input = 'This body part is {[player(john)@bodypart(testpart)@description]}';
                expectedOutput = 'This body part is a really cool part';
                output = manager.substitute(input);
            });

            it('should update the macro with the body part description', function() {
                expect(output).toBe(expectedOutput);
            });
        });

        describe('and replacement is characteristic value', function() {
            beforeEach(function() {
                input = 'This body part characteristic is {[player(john)@bodypart(testpart)@characteristic(testchr)@value]}';
                expectedOutput = 'This body part characteristic is test2value';
                output = manager.substitute(input);
            });

            it('should update the macro with the body part description', function() {
                expect(output).toBe(expectedOutput);
            });
        });
    });

    describe('when an invalid macro is used', function() {
        beforeEach(function() {
            input = 'This is a test {[withSome@invali(d)Macro]} yikes';
            output = manager.substitute(input);
        });

        it('should not replace the text', function() {
            expect(output).toBe(input);
        });
    });
});