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
        this._attemptRender();
        super.start();
    }

    completed(data) {
        super.completed(data.state);
        this._attemptRender();
    }

    _attemptRender() {
        let layout = super.currentGameState.layout.template;
        if (this.root && layout) {
            renderLayout(layout, this.root);
        }
    }
}