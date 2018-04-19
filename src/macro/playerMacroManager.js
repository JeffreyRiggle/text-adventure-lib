const inventoryMacro = /inventory.*/i;
const equipmentMacro = /equipment.*/i;
const attributeMacro = /attribute.*/i;
const bodyPartMacro = /bodypart.*/i;
const characteristicMacro = /characteristic.*/i;
const propertyMacro = /property.*/i;
const nameReg = /name.*/i;

export class PlayerMacroManager {
    constructor(parameters) {
        this.parameters = parameters;
        this.players = [];

        this.hasMacro = new RegExp(`(${this.parameters.prefix}.*${this.parameters.suffix})`, 'i');
        this.suffixMatch = new RegExp(`.*${this.parameters.parameterSuffix}.*`, 'i');
        this.playerTest = new RegExp(`player${this.parameters.parameterPrefix}.*`, 'i');
        this.replaceReg = new RegExp(`(${this.parameters.prefix}.*?)(.+?)${this.parameters.suffix}`, 'i');
    }

    substitute(originalText) {
        if (!this.hasMacro.test(originalText)) {
            return originalText;
        }

        let subs = this.hasMacro.exec(originalText);
        subs.splice(0, 1);
        let retList = [];

        for (let macro of subs) {
            if (!this.playerTest.test(macro)) {
                continue;
            }

            this._assignPlayer(macro);
            
            let preLen = this._getUnescapedLength(this.parameters.parameterPrefix);
            let sufLen = this._getUnescapedLength(this.parameters.parameterSuffix);
            let sepLen = this._getUnescapedLength(this.parameters.separator);

            macro = macro.substring(6 + this.currentPlayer.name.length + preLen + sufLen + sepLen);

            if (nameReg.test(macro)) {
                retList.push(this.currentPlayer.name);
                continue;
            }

            macro = macro.replace(this._getUnescapedValue(this.parameters.suffix), '');
            retList.push(this._getSubstitution(macro));
        }

        let retVal = originalText;
        for (let str of retList) {
            retVal = retVal.replace(this.replaceReg, str);
        }

        return retVal;
    }

    _getUnescapedLength(text) {
        let retVal = 0;

        for (let character of text) {
            if (character === '\\') continue;
            retVal++;
        }

        return retVal;
    }

    _assignPlayer(text) {
        let playerName = this._getParameter(text);

        for (let player of this.players) {
            if (player.name.toLowerCase() === playerName.toLowerCase()) {
                this.currentPlayer = player;
            }
        }
    }

    _getParameter(text) {
        let parameter = '';
        let matches = text.split(this._getUnescapedValue(this.parameters.parameterPrefix));

        if (!matches) {
            return parameter;
        }

        for (let match of matches) {
            if (this.suffixMatch.test(match)) {
                parameter = match.split(this._getUnescapedValue(this.parameters.parameterSuffix))[0];
                break;
            }
        }

        return parameter;
    }

    _getUnescapedValue(str) {
        return str.replace(/\\/g, '');
    }

    _getSubstitution(text) {
        if (inventoryMacro.test(text)) {
            return this._inventorySubstitution(text);
        }
        if (equipmentMacro.test(text)) {
            return this._equipmentSubstitution(text);
        }
        if (attributeMacro.test(text)) {
            return this._attributeSubstitution(text);
        }
        if (bodyPartMacro.test(text)) {
            return this._bodyPartSubsitution(text);
        }
        if (characteristicMacro.test(text)) {
            return this._characteristicSubsitution(text);
        }

        return '';
    }

    _inventorySubstitution(text) {
        let temp = text.substring(8);
        let param = this._getParameter(temp);
        let item = this._find(this.currentPlayer.inventory.items, param);

        return this._processItem(item, temp);
    }

    _equipmentSubstitution(text) {
        let temp = text.substring(9);
        let param = this._getParameter(temp);
        let bodypart = this._find(this.currentPlayer.bodyParts, param);

        if (!bodypart) {
            return '';
        }

        let item = this.currentPlayer.equipment.equiped(bodypart);

        return this._processItem(item, temp);
    }

    _processItem(item, text) {
        if (!item) {
            return '';
        }

        let chain = text.split(this.parameters.separator);
        if (!propertyMacro.test(chain[1])) {
            return item[chain[1]];
        }

        let propParam = this._getParameter(chain[1]);
        let prop = this._find(item.properties, propParam);
        if (!prop) {
            return '';
        }

        return prop[chain[2]];
    }

    _attributeSubstitution(text) {
        let temp = text.substring(9);
        let param = this._getParameter(temp);
        let attribute = this._find(this.currentPlayer.attributes, param);

        if (!attribute) {
            return '';
        }

        let chain = temp.split(this.parameters.separator);
        return attribute[chain[1]];
    }

    _bodyPartSubsitution(text) {
        let temp = text.substring(9);
        let param = this._getParameter(temp);
        let bodypart = this._find(this.currentPlayer.bodyParts, param);

        if (!bodypart) {
            return '';
        }

        let chain = temp.split(this.parameters.separator);
        if (!characteristicMacro.test(chain[1])) {
            return bodypart[chain[1]];
        }

        let charParam = this._getParameter(chain[1]);
        let characteristic = this._find(bodypart.characteristics, charParam);
        if (!characteristic) {
            return '';
        }

        return characteristic[chain[2]];
    }

    _characteristicSubsitution(text) {
        let temp = text.substring(14);
        let param = this._getParameter(temp);
        let characteristic = this._find(this.currentPlayer.characteristics, param);

        if (!characteristic) {
            return '';
        }

        let chain = temp.split(this.parameters.separator);
        return characteristic[chain[1]];
    }

    _find(arr, id) {
        for (let val of arr) {
            if (val.name === id) {
                return val;
            }
        }
    }
}