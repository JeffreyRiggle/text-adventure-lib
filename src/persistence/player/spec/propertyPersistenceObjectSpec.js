import {PropertyPersistenceObject} from '../propertyPersistenceObject';

describe('PropertyPersistenceObject', function() {
    var obj, persist, name, description, value;

    beforeEach(function() {
        name = 'Property Name';
        description = 'Property Description';
        value = 'Property value';

        persist = {
            name: 'Property',
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

        obj = new PropertyPersistenceObject();
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

        describe('when object is converted to a property', function() {
            var prop;

            beforeEach(function() {
                prop = obj.convertToProperty();
            });

            it('should have the correct name', function() {
                expect(prop.name).toBe(name);
            });

            it('should have the correct description', function() {
                expect(prop.description).toBe(description);
            });

            it('should have the correct value', function() {
                expect(prop.value).toBe(value);
            });
        });

        describe('when the object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name and type', function() {
                expect(config.name).toBe('NamedObject');
                expect(config.properties.get('type')).toBe('Property');
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(3);
            });
        });
    });
});