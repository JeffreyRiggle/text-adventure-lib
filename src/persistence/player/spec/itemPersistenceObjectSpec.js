import {ItemPersistenceObject} from '../itemPersistenceObject';

describe('ItemPersistenceObject', function() {
    var obj, persist, name, description;

    beforeEach(function() {
        name = 'Item Name';
        description = 'Item Description';

        persist = {
            name: 'Item',
            properties: new Map(),
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
                    name: 'Properties',
                    children: [
                        {
                            name: 'Property',
                            children: [
                                {
                                    name: 'Name',
                                    value: 'Char1'
                                },
                                {
                                    name: 'Description',
                                    value: 'Test'
                                },
                                {
                                    name: 'Value',
                                    value: 'Foo'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        obj = new ItemPersistenceObject();
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

        it('should have a property', function() {
            expect(obj.properties.length).toBe(1);
            expect(obj.properties[0].name).toBe('Char1');
            expect(obj.properties[0].description).toBe('Test');
            expect(obj.properties[0].value).toBe('Foo');
        });

        describe('when object is converted to a item', function() {
            var item;

            beforeEach(function() {
                item = obj.convertToItem();
            });

            it('should have the correct name', function() {
                expect(item.name).toBe(name);
            });

            it('should have the correct description', function() {
                expect(item.description).toBe(description);
            });

            it('Should have the correct properties', function() {
                expect(item.properties.length).toBe(1);
                expect(item.properties[0].name).toBe('Char1');
                expect(item.properties[0].description).toBe('Test');
                expect(item.properties[0].value).toBe('Foo');
            });
        });

        describe('when the object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('Should have the correct name', function() {
                expect(config.name).toBe('Item');
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(3);
                expect(config.children[2].children.length).toBe(1);
                expect(config.children[2].children[0].children.length).toBe(3);
            });
        });
    });
});