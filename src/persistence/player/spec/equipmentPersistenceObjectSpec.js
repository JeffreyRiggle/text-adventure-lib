import {EquipmentPersistenceObject} from '../equipmentPersistenceObject';

describe('EquipmentPersistenceObject', function() {
    var obj, persist;

    beforeEach(function() {
        persist = {
            name: 'Equipment',
            children: [
                {
                    name: 'Equiptable',
                    children: [
                        {
                            name: 'Item',
                            properties: new Map(),
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
                        },
                        {
                            name: 'BodyPart',
                            children: [
                                {
                                    name: 'Name',
                                    value: 'TestBP'
                                },
                                {
                                    name: 'Description',
                                    value: 'desc'
                                },
                                {
                                    name: 'Characteristics',
                                    children: [
                                        {
                                            name: 'Characteristic',
                                            children: [
                                                {
                                                    name: 'Name',
                                                    value: 'TestC'
                                                },
                                                {
                                                    name: 'Description',
                                                    value: 'TestCDESC'
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
                        }
                    ]
                }
            ]
        };

        obj = new EquipmentPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have the correct item', function() {
            let item = obj.equipment.get(obj.equipment.keys().next().value);
            expect(item.name).toBe('Item1');
        });

        it('should have the correct body part', function() {
            expect(obj.equipment.keys().next().value.name).toBe('TestBP');
        });

        describe('when object is converted to an Equipment', function() {
            var equip;

            beforeEach(function() {
                equip = obj.convertToEquipment();
            });

            it('should have the correct item', function() {
                let item = equip.getEquip(equip.equiped.keys().next().value);
                expect(item.name).toBe('Item1');
            });

            it('should have the correct Body Part', function() {
                let bp = equip.equiped.keys().next().value;
                expect(bp.name).toBe('TestBP');
            });
        });

        describe('when the object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('Should have the correct name', function() {
                expect(config.name).toBe("Equipment");
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(1);
                expect(config.children[0].children.length).toBe(2);
                expect(config.children[0].children[0].children.length).toBe(3);
                expect(config.children[0].children[1].children.length).toBe(3);
            });
        });
    });
});