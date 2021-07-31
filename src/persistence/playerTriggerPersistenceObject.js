import {PlayerTrigger} from '../triggers/playerTrigger';
import { ConfigurationObject } from '@jeffriggle/persist-lib';

export class PlayerTriggerPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Trigger');
        retVal.properties.set('type', 'Player');

        let params = new ConfigurationObject('Parameters');
        params.children.push(new ConfigurationObject('PlayerName', this.playerName));
        if (this.modificationObject) {
            params.children.push(new ConfigurationObject('ModificationObject', this.modificationObject));
        }
        if (this.id) {
            params.children.push(new ConfigurationObject('ID', this.id.join(',')));
        }
        if (this.condition) {
            params.children.push(new ConfigurationObject('Condition', this.condition));
        }
        if (this.dataMember) {
            params.children.push(new ConfigurationObject('DataMember', this.dataMember));
        }
        if (this.originalComparisonData) {
            params.children.push(new ConfigurationObject('ComparisionData', this.originalComparisonData));
        }

        retVal.children.push(params);

        return retVal;
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
        this.originalComparisonData = persistence.value;
        let valueType = persistence.properties.get('ValueType');

        if (valueType === 'bool') {
            this.comparisonData = (this.originalComparisonData.toLowerCase() === 'true');
        }
        else if (valueType === 'int' || valueType === 'float' || valueType === 'double') {
            this.comparisonData = Number(this.originalComparisonData);
        }
        else {
            this.comparisonData = this.originalComparisonData;
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