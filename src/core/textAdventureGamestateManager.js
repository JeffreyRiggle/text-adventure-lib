import { GameStateManager } from '../../node_modules/gamestate-manager/dist/main';
import { renderLayout } from '../layout/layoutRenderer.jsx';

export class TextAdventureGameStateManager extends GameStateManager {
    constructor(id, gameState, players, root) {
        super(id, gameState, {
            players: players
        });

        this.root = root;
    }

    get players() {
        return this._runtimeData.players;
    }

    start() {
        let layout = super.currentGameState.layout.template;
        if (this.root && layout) {
            renderLayout(layout, this.root);
        }
        
        super.start();
    }
}