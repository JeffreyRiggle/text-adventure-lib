import { TextAdventureGameStateManager } from '../textAdventureGameStateManager';

describe('TextAdventureGameStateManager', function() {
    var manager,
        renderer, 
        id,
        id2,
        state,
        state2,
        root,
        player1,
        players;

    beforeEach(function() {
        id = 'test';
        id2 = 'test2';
        root = {};

        state = {
            layout: {
                template: '<h1>Hello World!</h1>',
                render: function(root) {
                    this.root = root;
                }
            },
            started: false,
            data: {},
            run: function(runtimeData) {
                this.started = true;
                this.data = runtimeData;
            },
            removeListener: function() {},
            on: function() {}
        };

        state2 = {
            layout: {
                template: '<h1>Hello World version 2!</h1>',
                render: function(root) {
                    this.root = root;
                }
            },
            started: false,
            data: {},
            run: function(runtimeData) {
                this.started = true;
                this.data = runtimeData;
            },
            removeListener: function() {},
            on: function() {}
        };

        player1 = {playername: 'tester'};
        players = [player1];
        manager = new TextAdventureGameStateManager(id, state, players, root);
        manager.addGameState(id2, state2);
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
            expect(state.layout.root).toBe(root);
        });

        describe('when a game state is completed', function() {
            beforeEach(function() {
                manager.completed({state: id2, textLog: 'hello world!'});
            });

            it('should render the new layout', function() {
                expect(state2.layout.root).toBe(root);
            });

            it('should move to the next game state', function() {
                expect(manager.currentGameState).toBe(state2);
            });
        });
    });
});