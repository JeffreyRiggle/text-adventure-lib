import {ScriptedActionPersistenceObject} from '../scriptedActionPersistenceObject';

describe('ScriptedActionPersistenceObject', function() {
    var obj, persistence, encodedScript, originalScript;

    beforeEach(function() {
        originalScript = '(function() { function execute(data) { data.players[0].attributes.push({name: \'test\'}); } return { execute: execute }})()';
        encodedScript = btoa(originalScript);

        persistence = {
            children: [
                {
                    name: 'Parameters',
                    children: [
                        {
                            name: 'Script',
                            value: encodedScript
                        }
                    ]
                }
            ]
        };

        obj = new ScriptedActionPersistenceObject();
    });

    describe('when persistence is converted', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persistence);
        });

        it('should have a script property', function() {
            expect(obj.script).toBe(originalScript);
        });

        describe('when object is converted into a action', function() {
            var action, player1;

            beforeEach(function() {
                player1 = {name: 'player1', attributes: []};
                action = obj.convertToAction();
                action.execute({players: [player1]});
            });

            it('properly evaluate the script in the action', function() {
                expect(player1.attributes[0].name).toBe('test');
            });
        });
    });
});