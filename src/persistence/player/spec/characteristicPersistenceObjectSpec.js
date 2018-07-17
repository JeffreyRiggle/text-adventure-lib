import {CharacteristicPersistenceObject} from '../characteristicPersistenceObject';

describe('CharacteristicPersistenceObject', function() {
    var obj, persist, name, description, value;

    beforeEach(function() {
        name = 'Characteristic Name';
        description = 'Characteristic Description';
        value = 'Characteristic value';

        persist = {
            name: 'Characteristic',
            children: [
                {
                    name: 'Name',
                    value: name
                },
                {
                    name: 'Description',
                    value: description
                },
                {
                    name: 'Value',
                    value: value
                }
            ]
        };

        obj = new CharacteristicPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have a name', function() {
            expect(obj.name).toBe(name);
        });

        it('should have a description', function() {
            expect(obj.description).toBe(description);
        });

        it('should have a value', function() {
            expect(obj.value).toBe(value);
        });

        describe('when object is converted to a characteristic', function() {
            var chr;

            beforeEach(function() {
                chr = obj.convertToCharacteristic();
            });

            it('should have the correct name', function() {
                expect(chr.name).toBe(name);
            });

            it('should have the correct description', function() {
                expect(chr.description).toBe(description);
            });

            it('should have the correct value', function() {
                expect(chr.value).toBe(value);
            });
        });

        describe('when the object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name and type', function() {
                expect(config.name).toBe('NamedObject');
                expect(config.properties.get('type')).toBe('Characteristic');
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(3);
            });
        });
    });
});