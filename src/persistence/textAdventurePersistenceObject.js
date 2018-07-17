import { PlayerPersistenceObject } from './player/playerPersistenceObject';
import { TransitionPersistenceObject } from './transitionPersistenceObject';
import { GameStatePersistenceObject } from './gameStatePersistenceObject';
import { LayoutPersistenceObject } from './layoutPersistenceObject';
import { TextAdventureGameStateManager } from '../core/textAdventureGameStateManager';
import { ConfigurationObject } from '../../node_modules/persist-lib/dist/main';

const INLINEPLAYERS = 'inlineplayers',
 INLINEGAMESTATE = 'inlinegamestate',
 INLINELAYOUT = 'inlineLayouts',
 PLAYERSLOCATION = 'PlayersLocation',
 CURRENTGAMESATE ='CurrentGameState',
 GAMESTATESLOCATION = 'GameStatesLocation',
 GAMESTATES = 'GameStates',
 PLAYERS = 'Players',
 TRANSITION = 'Transition',
 GAME = 'Name',
 BUFFER = 'Buffer',
 LAYOUTLOCATION = 'LayoutLocation',
 LAYOUTS = 'Layouts',
 LAYOUT = 'Layout',
 PLAYER = 'Player';


export class TextAdventurePersistenceObject {
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

    convertToConfig() {
        let retVal = new ConfigurationObject('TextAdventure');

        let inlinePlayers = !!this.playersLocation;
        let inlineGameStates = !!this.gameStatesLocation;
        let inlineLayouts = !!this.layoutsLocation;

        retVal.properties.set('inlineplayers', inlinePlayers);
        retVal.properties.set('inlinegamestate', inlineGameStates);
        retVal.properties.set('inlineLayouts', inlineLayouts);

        retVal.children.push(new ConfigurationObject('Name', this.gameName));
        retVal.children.push(new ConfigurationObject('CurrentGameState', this.currentGameState));

        if (this.transition) {
            retVal.children.push(this.transition.convertToConfig());
        }

        if (inlinePlayers) {
            let playersConfig = new ConfigurationObject('Players');
            this.players.forEach((player) => {
                playersConfig.children.push(player.convertToConfig());
            });
        } else {
            // TODO
        }

        if (inlineGameStates) {
            let gameStateConfig = new ConfigurationObject('GameStates');
            this.gameStates.forEach((gameState) => {
                gameStateConfig.children.push(gameState.convertToConfig());
            });
        } else {
            // TODO
        }

        if (this.inlinelayout) {
            let layoutConfig = new ConfigurationObject('Layouts');
            this.layouts.forEach((layout) => {
                layoutConfig.children.push(layout.convertToConfig());
            });
        } else {
            // TODO
        }

        return retVal;
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

    convertToGameStateManager(root) {
        let players = [];

        if (this.inlinePlayers) {
            //TODO
        } else {
            for (let player of this.players) {
                players.push(player.convertToPlayer());
            }
        }

        let gameStates = new Map();
        let currentGameState;

        if (this.inlineGameState) {
            //TODO
        } else {
            for (let gameState of this.gameStates) {
                let gs = gameState.convertToGameState();

                if (gameState.stateId === this.currentGameState) {
                    currentGameState = gs;
                }

                gameStates.set(gameState.stateId, gs);
            }
        }

        //TODO buffer

        let manager = new TextAdventureGameStateManager(currentGameState.stateId, currentGameState, players, root);
        gameStates.forEach((value, key, map) => {
            manager.addGameState(key, value);
        });

        return manager;
    }
}