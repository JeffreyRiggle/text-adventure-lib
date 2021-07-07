import {BodyPart} from '../../../node_modules/player-lib/dist/main';
import {CharacteristicPersistenceObject} from './characteristicPersistenceObject';
import { ConfigurationObject } from '@jeffriggle/persist-lib/dist/main';

const NAME = 'Name',
 DESCRIPTION = 'Description',
 CHARACTERISTICS = 'Characteristics';
 
export class BodyPartPersistenceObject {
    constructor(bodyPart) {
        this.characteristics = [];

        if (bodyPart) {
            convertToPersistence(bodyPart);
        }
    }

    convertFromPersistence(persistence) {
        for (let child of persistence.children) {
            if (child.name === NAME) {
                this.name = child.value;
            }
            if (child.name === DESCRIPTION) {
                this.description = child.value;
            }
            if (child.name === CHARACTERISTICS) {
                this._convertCharacteristics(child);
            }
        }
    }

    convertToPersistence(bodyPart) {
        this.name = bodyPart.name;
        this.description = bodyPart.description;

        for (let chr of bodyPart.characteristics) {
            this.characteristics.push(new CharacteristicPersistenceObject(chr));
        }
    }

    convertToConfig() {
        let retVal = new ConfigurationObject('BodyPart');

        retVal.children.push(new ConfigurationObject(NAME, this.name));
        retVal.children.push(new ConfigurationObject(DESCRIPTION, this.description));

        let chrs = new ConfigurationObject(CHARACTERISTICS);
        for (let chr of this.characteristics) {
            chrs.children.push(chr.convertToConfig());
        }
        retVal.children.push(chrs);

        return retVal;
    }

    _convertCharacteristics(persistence) {
        for (let child of persistence.children) {
            let chr = new CharacteristicPersistenceObject();
            chr.convertFromPersistence(child);
            this.characteristics.push(chr);
        }
    }
    
    convertToBodyPart() {
        let bp = new BodyPart(this.name, this.description);

        for (let chr of this.characteristics) {
            bp.addCharacteristic(chr.convertToCharacteristic());
        }

        return bp;
    }    
}