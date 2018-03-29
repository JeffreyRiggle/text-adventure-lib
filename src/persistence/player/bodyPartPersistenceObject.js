import {BodyPart} from '../../node_modules/player-lib/dist/main';
import {CharacteristicPersistenceObject} from './characteristicPersistenceObject';

const NAME = 'Name',
 DESCRIPTION = 'Description',
 CHARACTERISTICS = 'Characteristics';
 
export class BodyPartPersistenceObject {
    constructor() {
        this.characteristics = [];
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