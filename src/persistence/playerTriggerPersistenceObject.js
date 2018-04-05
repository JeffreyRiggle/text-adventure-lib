import {PlayerTrigger} from '../triggers/playerTrigger';

export class PlayerTriggerPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'ModificationObject') {
                this.modificationObject = child.value;
            }
            if (child.name === 'ID') {
                this.id = child.value.split(',');
            }
            if (child.name === 'Condition') {
                this.condition = child.value;
            }
            if (child.name === 'DataMember') {
                this.dataMember = child.value;
            }
            if (child.name === 'ComparisionData') {
                this._convertComparisonData(child);
            }
            if (child.name === 'PlayerName') {
                this.playerName = child.value;
            }
        }
    }

    _convertComparisonData(persistence) {
        let valueType = persistence.properties.get('ValueType');

        if (valueType === 'bool') {
            this.comparisonData = (persistence.value.toLowerCase() === 'true');
        }
        else if (valueType === 'int' || valueType === 'float' || valueType === 'double') {
            this.comparisonData = Number(persistence.value);
        }
        else {
            this.comparisonData = persistence.value;
        }
    }

    convertToTrigger() {
        let data = {
            modificationObject: this.modificationObject,
            id: this.id,
            condition: this.condition,
            dataMember: this.dataMember,
            comparisonData: this.comparisonData
        };

        return new PlayerTrigger(this.playerName, data);
    }
}