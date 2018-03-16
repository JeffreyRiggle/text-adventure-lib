import { ScriptedAction } from '../scriptedAction';

describe('ScriptedAction', function() {
    var action, script, player1;

    beforeEach(function() {
        script = '(function() { function execute(data) { data.players[0].attributes.push({name: \'test\'}); } return { execute: execute }})()';
        player1 = {name: 'player1', attributes: []};
        action = new ScriptedAction(script);
    });

    describe('when action is executed', function() {
        beforeEach(function() {
            action.execute({
                players: [player1]
            });
        });

        it('should run the script', function() {
            expect(player1.attributes[0].name).toBe('test');
        });
    });
});