//This needs to be fixed. I am guessing I will need to publish dist to npm
import GameStateManager from '../../node_modules/gamestate-manager/src/gamestateManager';
//TODO remove this.
import '../layout/views/buttonInput.jsx';

class TextAdventureGameStateManager extends GameStateManager {
    constructor(id, gameState, players) {
        super(id, gameState, {
            players: players
        });
    }

    get players() {
        return this._runtimeData.players;
    }
}

export default TextAdventureGameStateManager;