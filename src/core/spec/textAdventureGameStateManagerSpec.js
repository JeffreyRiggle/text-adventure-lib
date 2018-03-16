import { TextAdventureGameStateManager } from '../textAdventureGameStateManager';

describe('TextAdventureGameStateManager', function() {
    var manager, 
        id, 
        state,
        player1,
        players;

    beforeEach(function() {
        id = 'test';
        state = {
            started: false,
            data: {},
            run: function(runtimeData) {
                this.started = true;
                this.data = runtimeData;
            },
            on: function() {}
        };

        player1 = {playername: 'tester'};
        players = [player1];
        manager = new TextAdventureGameStateManager(id, state, players);
    });

    it('should have the correct players', function() {
        expect(manager.players).toBe(players);
    });

    describe('when game is stated', function() {
        beforeEach(function() {
            manager.start();
        });

        it('should start the game state', function() {
            expect(state.started).toBe(true);
        });

        it('should use the correct runtime data', function() {
            expect(state.data.players).toBe(players);
        });
    });
});