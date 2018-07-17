import {InventoryPersistenceObject} from '../inventoryPersistenceObject';

describe('InventoryPersistenceObject', function() {
    var obj, persist;

    beforeEach(function() {
        var props = new Map();
        props.set('Amount', 12);

        persist = {
            name: 'Inventory',
            children: [
                {
                    name: 'Items',
                    children: [
                        {
                            name: 'Item',
                            properties: props,
                            children: [
                                {
                                    name: 'Name',
                                    value: 'Item1'
                                },
                                {
                                    name: 'Description',
                                    value: 'SOme item'
                                },
                                {
                                    name: 'Value',
                                    value: 'Testing'
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        obj = new InventoryPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should the correct item', function() {
            expect(obj.items[0].name).toBe('Item1');
        });

        it('should have the correct item amount', function() {
            expect(obj.items[0].amount).toBe(12);
        });

        describe('when object is converted to an Inventory', function() {
            var inv;

            beforeEach(function() {
                inv = obj.convertToInventory();
            });

            it('should have the correct item', function() {
                let item = inv.items.next().value;
                expect(item.name).toBe('Item1');
            });

            it('should have the correct item amount', function() {
                let item = inv.items.next().value;
                expect(inv.getItemAmount(item)).toBe(12);
            });
        });

        describe('when the object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('Should have the correct name', function() {
                expect(config.name).toBe("Inventory");
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(1);
                expect(config.children[0].children.length).toBe(1);
                expect(config.children[0].children[0].children.length).toBe(3);
            });
        });
    });
});