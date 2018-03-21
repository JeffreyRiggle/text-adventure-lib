import { TextAdventureGameStateManager } from '../textAdventureGameStateManager';
import * as renderLayout from '../../layout/layoutRenderer.jsx';

describe('TextAdventureGameStateManager', function() {
    var manager,
        renderer, 
        id, 
        state,
        root,
        player1,
        players;

    beforeEach(function() {
        id = 'test';
        root = {};

        renderer = spyOn(renderLayout, 'renderLayout');

        state = {
            layout: {
                template: '<h1>Hello World!</h1>'
            },
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
        manager = new TextAdventureGameStateManager(id, state, players, root);
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

        it('should render the layout', function() {
            expect(renderer).toHaveBeenCalledWith(state.layout.template, root);
        });
    });
});