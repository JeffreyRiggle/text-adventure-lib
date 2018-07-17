import {TextAdventurePersistenceManager} from '../persistence/textAdventurePersistenceManager';
import { PlayerPersistenceObject } from '../persistence/player/playerPersistenceObject';

export class SaveAction {
    constructor(fileName, data) {
        this.fileName = fileName;
        this.manager = new TextAdventurePersistenceManager(data, false);

        this.manager.load();
    }

    execute(params) {
        this._updateManager(params);
        this.manager.save(this.fileName);
    }

    _updateManager(params) {
        this.manager.textAdventure.players = [];

        for (let player of params.players) {
            this.manager.textAdventure.players.push(new PlayerPersistenceObject(player));
        }

        this.manager.textAdventure.currentGameState = params.currentGameState;
    }
}