import { GameStateManager } from '../../node_modules/gamestate-manager/src/gamestateManager';

export class TextAdventureGameStateManager extends GameStateManager {
    constructor(id, gameState, players) {
        super(id, gameState, {
            players: players
        });
    }

    get players() {
        return this._runtimeData.players;
    }
}