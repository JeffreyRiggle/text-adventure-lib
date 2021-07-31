import { GameStateManager } from '@jeffriggle/gamestate-manager';
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
        this._runtimeData.textLog = data.textLog;
        super.completed(data.state);
        this._attemptRender();
    }

    _attemptRender() {
        let layout = super.currentGameState.layout;
        if (this.root && layout) {
            layout.render(this.root);
        }
    }
}