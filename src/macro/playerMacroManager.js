const inventoryMacro = /inventory.*/i;
const equipmentMacro = /equipment.*/i;
const attributeMacro = /attribute.*/i;
const bodyPartMacro = /bodypart.*/i;
const characteristicMacro = /characteristic.*/i;
const propertyMacro = /property.*/i;
const nameReg = /name.*/i;

class PlayerMacroManager {
    constructor(parameters) {
        this.parameters = parameters;
        this.players = [];

        this.hasMacro = new RegExp(`(${this.parameters.prefix}.*${this.parameters.suffix})`, 'i');
        this.suffixMatch = new RexExp(`.*${this.parameters.suffix}.*`, 'i');
        this.playerTest = new RegEx(`player${this.parameters.prefix}.*`, 'i');
        this.replaceReg = new RegEx(`(${this.parameters.prefix}.*?)(.+?)${this.parameters.suffix}`, 'i');
    }

    substitute(originalText) {
        if (!this.hasMacro.test(originalText)) {
            return;
        }

        let subs = this.hasMacro.exec(originalText);
        let retList = [];

        for (let macro of subs) {
            if (!this.playerTest.test(macro)) {
                continue;
            }

            this._assignPlayer(macro);
            
            let preLen = this._getUnescapedLength(this.parameters.prefix);
            let sufLen = this._getUnescapedLength(this.parameters.suffix);
            let sepLen = this._getUnescapedLength(this.parameters.separator);

            macro = macro.substring(6 + this.currentPlayer.name.length + preLen + sufLen + sepLen);

            if (nameReg.test(macro)) {
                retList.push(this.currentPlayer.name);
                continue;
            }

            retList.push(this._getSubstitution(macro));
        }

        let retVal = originalText;
        for (let str of retList) {
            retVal.replace(this.replaceReg, str);
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
            if (player.name.toLower() === playerName.toLower()) {
                this.currentPlayer = player;
            }
        }
    }

    _getParameter(text) {
        let parameter = '';
        let matches = text.split(this.parameters.prefix);

        if (!matches) {
            return parameter;
        }

        for (let match of matches) {
            if (this.suffixMatch.test(match)) {
                parameter = match.split(this.parameters.suffix)[0];
            }
        }

        return parameter;
    }

    _getSubsitution(text) {
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
        let bodypart = this._find(this.currentPlayer.bodyparts, param);

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
        let attribute = this._find(player.attributes, param);

        if (!attribute) {
            return '';
        }

        let chain = temp.split(this.parameters.separator);
        return attribute[chain[1]];
    }

    _bodyPartSubsitution(text) {
        let temp = text.substring(9);
        let param = this._getParameter(temp);
        let bodypart = this._find(this.currentPlayer.bodyparts, param);

        if (!bodypart) {
            return '';
        }

        let chain = temp.split(this.parameters.separator);
        if (!propertyMacro.test(chain[1])) {
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
        let characteristic = this._find(player.characteristics, param);

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

export default PlayerMacroManager;