import {PlayerPersistenceObject} from './player/playerPersistenceObject';
import {TransitionPersistenceObject} from './transitionPersistenceObject';

const INLINEPLAYERS = '',
 INLINEGAMESTATE = '',
 INLINELAYOUT = '',
 PLAYERSLOCATION = '',
 CURRENTGAMESATE ='',
 GAMESTATESLOCATION = '',
 GAMESTATES = '',
 PLAYERS = '',
 TRANSITION = '',
 GAME = '',
 BUFFER = '',
 LAYOUTLOCATION = '',
 LAYOUTS = '',
 LAYOUT = '',
 PLAYER = '';


class TextAdventurePersistenceObject {
    constructor() {
        this.players = [];
        this.gameStates = [];
        this.layouts = [];
    }

    convertFromPersistence(persistence) {
        this._processProperties(persistence);

        for (let child of persistence.children) {
            if (child.name === PLAYERSLOCATION) {
                this.playersLocation = child.value;
            }
            if (child.name === CURRENTGAMESATE) {
                this.currentGameState = child.value;
            }
            if (child.name === GAMESTATESLOCATION) {
                this.gameStatesLocation = child.value;
            }
            if (child.name === GAMESTATES) {
                this._convertGameStates(child);
            }
            if (child.name === PLAYERS) {
                this._convertPlayers(child);
            }
            if (child.name === TRANSITION) {
                this._convertTransition(child);
            }
            if (child.name === GAME) {
                this.gameName = child.value;
            }
            if (child.name === BUFFER) {
                this.buffer = child.value;
            }
            if (child.name === LAYOUTLOCATION) {
                this.layoutsLocation = child.value;
            }
            if (child.name === LAYOUTS) {
                this._convertLayouts(child);
            }
        }
    }

    _convertGameStates(persistence) {
        for (let child of persistence.children) {
            let gameState = new GameStatePersistenceObject();
            gameState.convertFromPersistence(child);
            this.gameStates.push(gameState);
        }
    }

    _convertPlayers(persistence) {
        for (let child of persistence.children) {
            if (child.name === PLAYER) {
                let player = new PlayerPersistenceObject();
                player.convertFromPersistence(child);
                this.players.push(player);
            }
        }
    }

    _convertTransition(persistence) {
        let transition = new TransitionPersistenceObject();
        transition.convertFromPersistence(persistence);
        this.transition = transition;
    }

    _convertLayouts(persistence) {
        for (let child of persistence.children) {
            if (child.name === LAYOUT) {
                let layout = new LayoutPersistenceObject();
                layout.convertFromPersistence(child);
                this.layouts.push(layout);
            }
        }
    }

    _processProperties(persistence) {
        persistence.properties.forEach((value, key, map) => {
            if (key === INLINEPLAYERS) {
                this.inlinePlayers = value;
            }
            if (key === INLINEGAMESTATE) {
                this.inlineGameState = value;
            }
            if (key === INLINELAYOUT) {
                this.inlinelayout = value;
            }
        });
    }

    convertToGameStateManager() {

    }
}