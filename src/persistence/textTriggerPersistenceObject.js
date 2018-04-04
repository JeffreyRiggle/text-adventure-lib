import {TextTrigger} from '../triggers/textTrigger';

export class TextTriggerPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Text') {
                this.text = child.value;
            }
            if (child.name === 'MatchType') {
                this.matchType = child.value;
            }
            if (child.name === 'CaseSensitive') {
                this.caseSensitive = (child.value.toLowerCase() !== 'false');
            }
        }
    }

    convertToTrigger() {
        return new TextTrigger(this._toRegex());
    }

    _toRegex() {
        let flags;
        if (this.caseSensitive) {
            flags = 'i';
        }

        if (this.matchType === 'Exact') {
            return new RegExp(this.text, flags);
        }
        if (this.matchType === 'Prefix') {
            return new RegExp(`${this.text}.*`, flags);
        }
        if (this.matchType === 'Postfix') {
            return new RegExp(`.*${this.text}`, flags);
        }
        if (this.matchType === 'Contains') {
            return new RegExp(`.*${this.text}.*`, flags);
        }
        if (this.matchType === 'NotContains') {
            return new RegExp(`^((?!(${this.text})).)*$`, flags);
        }
    }
}