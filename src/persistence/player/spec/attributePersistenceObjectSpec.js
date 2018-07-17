import {AttributePersistenceObject} from '../attributePersistenceObject';

describe('AttributePersistenceObject', function() {
    var obj, persist, name, description, value;

    beforeEach(function() {
        name = 'Attribute Name';
        description = 'Attribute Description';
        value = 'Attribute value';

        persist = {
            name: 'Attribute',
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

        obj = new AttributePersistenceObject();
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

        describe('when object is converted to an attribute', function() {
            var att;

            beforeEach(function() {
                att = obj.convertToAttribute();
            });

            it('should have the correct name', function() {
                expect(att.name).toBe(name);
            });

            it('should have the correct description', function() {
                expect(att.description).toBe(description);
            });

            it('should have the correct value', function() {
                expect(att.value).toBe(value);
            });
        });

        describe('when the object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name and type', function() {
                expect(config.name).toBe('NamedObject');
                expect(config.properties.get('type')).toBe('Attribute');
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(3);
            });
        });
    });
});