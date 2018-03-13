import PlayerMacroManager from '../playerMacroManager';

describe('PlayerMacroManager', function() {
    var parameters, manager, players, input, output, expectedOutput;

    beforeEach(function() {
        parameters = {
            prefix: '\\{\\[',
            suffix: '\\]\\}',
            parameterPrefix: '\\(',
            parameterSuffix: '\\)',
            separator: '@'
        };

        players = [
            {
                name: 'john',
                attributes: [],
                characteristics: [],
                bodyParts: [],
                inventory: {
                    items: [{
                        name: 'testitem',
                        description: 'a super cool item',
                        properties: [
                            {
                                name: 'testprop',
                                value: 'test property value'
                            }
                        ]
                    }]
                },
                equipment: {
                    equiped: function(part) {
                        
                    }
                }
            }
        ];

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
    })
});