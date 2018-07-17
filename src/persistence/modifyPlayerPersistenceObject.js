import _ from 'underscore';
import {BodyPartPersistenceObject} from './player/bodyPartPersistenceObject';
import {ItemPersistenceObject} from './player/itemPersistenceObject';
import {AttributePersistenceObject} from './player/attributePersistenceObject';
import {CharacteristicPersistenceObject} from './player/characteristicPersistenceObject';
import {PropertyPersistenceObject} from './player/propertyPersistenceObject';
import {ModifyPlayerAction} from '../actions/modifyPlayerAction';
import { ConfigurationObject } from '../../node_modules/persist-lib/dist/main';

export class ModifyPlayerPersistenceObject {
    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'Parameters') {
                this._convert(child);
            }
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('Action');
        retVal.properties.set('type', 'ModifyPlayer');

        let params = new ConfigurationObject('Parameters');
        params.children.push(new ConfigurationObject('PlayerName', this.playerName));
        if (this.modificationType) {
            params.children.push(new ConfigurationObject('ModificationType', this.modificationType));
        }
        if (this.modificationObject) {
            params.children.push(new ConfigurationObject('ModificationObject', this.modificationObject));
        }
        params.children.push(new ConfigurationObject('Data', String(this.data)));
        if (this.originalId) {
            params.children.push(new ConfigurationObject('ID', this.originalId));
        }
        if (this.changeType) {
            params.children.push(new ConfigurationObject('ChangeType', this.changeType));
        }

        retVal.children.push(params);

        return retVal;
    }

    _convert(persistence) {
        for (let child of persistence.children) {
            if (child.name === 'PlayerName') {
                this.playerName = child.value;
            }
            if (child.name === 'ModificationType') {
                this.modificationType = child.value;
            }
            if (child.name === 'ModificationObject') {
                this.modificationObject = child.value;
            }
            if (child.name === 'Data') {
                this._convertData(child);
            }
            if (child.name === 'ID') {
                this._convertId(child);
            }
            if (child.name === 'ChangeType') {
                this.changeType = child.value;
            }
        }
    }

    _convertData(persistence) {
        let valueType = persistence.properties.get('ValueType');

        if (valueType === 'bool') {
            this.data = (persistence.value.toLowerCase() === 'true');
        }
        else if (valueType === 'int' || valueType === 'float' || valueType === 'double') {
            this.data = Number(persistence.value);
        }
        else {
            this.data = this._attemptConversion(persistence);
        }
    }

    _convertId(persistence) {
        this.originalId = persistence.value;

        let valueType = persistence.properties.get('ValueType');

        if (valueType === 'bool') {
            this.id = (this.originalId.toLowerCase() === 'true');
        }
        else if (valueType === 'int' || valueType === 'float' || valueType === 'double') {
            this.id = Number(this.originalId);
        }
        else {
            this.id = this._attemptConversion(persistence);
        }
    }

    _attemptConversion(persistence) {
        let retVal = persistence.value;

        if (persistence.children.length < 1) {
            return retVal;
        }

        let firstChild = persistence.children[0];
        if (firstChild.name === 'BodyPart') {
            let retVal = new BodyPartPersistenceObject();
            retVal.convertFromPersistence(firstChild);
            return retVal;
        }

        if (firstChild.name === 'Item') {
            retVal = new ItemPersistenceObject();
            retVal.convertFromPersistence(firstChild);
            return retVal;
        }

        if (!firstChild.name === 'NamedObject') {
            return retVal;
        }

        let type = firstChild.properties.get('type');
        if (type === 'Attribute') {
            retVal = new AttributePersistenceObject();
            retVal.convertFromPersistence(firstChild);
            return retVal;
        }

        if (type === 'Characteristic') {
            retVal = new CharacteristicPersistenceObject();
            retVal.convertFromPersistence(firstChild);
            return retVal;
        }

        if (type === 'Property') {
            retVal = new PropertyPersistenceObject();
            retVal.convertFromPersistence(firstChild);
            return retVal;
        }

        return retVal;
    }

    convertToAction() {
        let modData = {
            args: {
                modificationObject: this.modificationObject,
                data: this._convertTo(this.data),
                id: this._convertTo(this.id),
                changeType: this.changeType
            },
            modificationType: this.modificationType
        };

        return new ModifyPlayerAction(this.playerName, modData);
    }

    _convertTo(data) {
        if (_.has(data, 'convertToAttribute')) {
            return data.convertToAttribute();
        }
        if (_.has(this.data, 'convertToCharacteristic')) {
            return this.data.convertToCharacteristic();
        }
        if (_.has(data, 'convertToProperty')) {
            return data.convertToProperty();
        }
        if (_.has(data, 'convertToBodyPart')) {
            return data.convertToBodyPart();
        }
        if (_.has(this.data, 'convertToItem')) {
            return data.convertToItem();
        }

        return data;
    }
}