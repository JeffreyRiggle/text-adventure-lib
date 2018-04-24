import { OptionPersistenceObject } from './optionPersistenceObject';
import { LayoutInfoPersistenceObject } from './layoutInfoPersistenceObject';
import { convertTimer } from './convertTimer';
import { TextAdventureGameState } from '../core/textAdventureGameState';
import { convertLayout } from './convertLayout.jsx';

export class GameStatePersistenceObject {
    constructor() {
        this.options = [];
        this.timers = [];
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'StateId') {
                this.stateId = child.value;
            }
            if (child.name === 'TextLog') {
                this.textLog = child.value;
            }
            if (child.name === 'Options') {
                this._convertOptions(child);
            }
            if (child.name === 'Timers') {
                this._convertTimers(child);
            }
            if (child.name === 'LayoutInfo') {
                this._convertLayoutInfo(child);
            }
        }
    }

    convertOptions(persistence) {
        for (let child of persistence.children) {
            let option = new OptionPersistenceObject();
            option.convertFromPersistence(persistence);
            this.options.push(option);
        }
    }

    convertTimers(persistence) {
        for (let child of persistence.children) {
            this.timers.push(convertTimer(child));
        }
    }

    convertLayoutInfo(persistence) {
        this.layout = new LayoutInfoPersistenceObject();
        this.layout.convertFromPersistence(persistence);
    }

    convertToGameState() {
        let options = [];
        let buttons = [];
        for (let option of this.options) {
            if (option.trigger.text) {
                buttons.push(option.trigger.text);
            }

            options.push(option.convertToOption());
        }

        let layout = convertLayout(this.layout, this.textLog, buttons);

        let timers = [];
        for (let timer of this.timers) {
            timers.push(timer.convertToTimer());
        }

        let macro = new PlayerMacroManager({
            prefix: '\\{\\[',
            suffix: '\\]\\}',
            parameterPrefix: '<<',
            parameterSuffix: '>>',
            separator: '@'
        });

        return new TextAdventureGameState(layout, options, timers, [macro]);
    }
}