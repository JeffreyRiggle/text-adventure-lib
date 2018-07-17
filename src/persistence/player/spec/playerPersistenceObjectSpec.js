import {PlayerPersistenceObject} from '../playerPersistenceObject';

describe('PlayerPersistenceObject', function() {
    var obj, persist, playerName, attName, attDescription, attValue, chrName, chrDescription, chrValue, 
      bpName, bpDescription, item1Name, item1Description, item2Name, item2Description, itemProps;

    beforeEach(function() {
        playerName = 'Player1';
        attName = 'Attribute Name';
        attDescription = 'Attribute Description';
        attValue = 'Attribute value';
        chrName = 'SomeChr';
        chrDescription = 'Something';
        chrValue = 'Foo';
        bpName = 'SomeBP';
        bpDescription = 'Something about bp';
        item1Name = 'Item1';
        item1Description = 'Some Item';
        item2Name = 'Item2';
        item2Description = 'Some Other Item';
        
        itemProps = new Map();
        itemProps.set('amount', 100);

        persist = {
            name: 'Player',
            children: [
                {
                    name: 'Name',
                    value: playerName
                },
                {
                    name: 'Attributes',
                    children: [
                        {
                            name: 'Attribute',
                            children: [
                                {
                                    name: 'Name',
                                    value: attName
                                },
                                {
                                    name: 'Description',
                                    value: attDescription
                                },
                                {
                                    name: 'Value',
                                    value: attValue
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Characteristics',
                    children: [
                        {
                            name: 'Characteristic',
                            children: [
                                {
                                    name: 'Name',
                                    value: chrName
                                },
                                {
                                    name: 'Description',
                                    value: chrDescription
                                },
                                {
                                    name: 'Value',
                                    value: chrValue
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'BodyParts',
                    children: [
                        {
                            name: 'BodyPart',
                            children: [
                                {
                                    name: 'Name',
                                    value: bpName
                                },
                                {
                                    name: 'Description',
                                    value: bpDescription
                                },
                                {
                                    name: 'Characteristics',
                                    children: [
                                        {
                                            name: 'Characteristic',
                                            children: [
                                                {
                                                    name: 'Name',
                                                    value: chrName
                                                },
                                                {
                                                    name: 'Description',
                                                    value: chrDescription
                                                },
                                                {
                                                    name: 'Value',
                                                    value: chrValue
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Inventory',
                    children: [
                        {
                            name: 'Items',
                            children: [
                                {
                                    name: 'Item',
                                    properties: itemProps,
                                    children: [
                                        {
                                            name: 'Name',
                                            value: item1Name
                                        },
                                        {
                                            name: 'Description',
                                            value: item1Description
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
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
                                            value: item2Name
                                        },
                                        {
                                            name: 'Description',
                                            value: item2Description
                                        }
                                    ]
                                },
                                {
                                    name: 'BodyPart',
                                    children: [
                                        {
                                            name: 'Name',
                                            value: bpName
                                        },
                                        {
                                            name: 'Description',
                                            value: bpDescription
                                        },
                                        {
                                            name: 'Characteristics',
                                            children: [
                                                {
                                                    name: 'Characteristic',
                                                    children: [
                                                        {
                                                            name: 'Name',
                                                            value: chrName
                                                        },
                                                        {
                                                            name: 'Description',
                                                            value: chrDescription
                                                        },
                                                        {
                                                            name: 'Value',
                                                            value: chrValue
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
                }
            ]
        };

        obj = new PlayerPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have a player name', function() {
            expect(obj.playerName).toBe(playerName);
        });

        it('should have an attribute', function() {
            expect(obj.attributes.length).toBe(1);

            let att = obj.attributes[0];
            expect(att.name).toBe(attName);
            expect(att.description).toBe(attDescription);
            expect(att.value).toBe(attValue);
        });

        it('should have a characteristic', function() {
            expect(obj.characteristics.length).toBe(1);

            let chr = obj.characteristics[0];
            expect(chr.name).toBe(chrName);
            expect(chr.description).toBe(chrDescription);
            expect(chr.value).toBe(chrValue);
        });

        it('should have a body part', function() {
            expect(obj.bodyParts.length).toBe(1);

            let bp = obj.bodyParts[0];
            expect(bp.name).toBe(bpName);
            expect(bp.description).toBe(bpDescription);
            expect(bp.characteristics.length).toBe(1);
        });

        it('should have an inventory', function() {
            expect(obj.inventory.items.length).toBe(1);
            expect(obj.inventory.items[0].name).toBe(item1Name);
        });

        it('should have an equipment', function() {
            let item = obj.equipment.equipment.get(obj.equipment.equipment.keys().next().value);
            expect(item.name).toBe(item2Name);
        });

        describe('when object is converted to a player', function() {
            var player;

            beforeEach(function() {
                player = obj.convertToPlayer();
            });

            it('should have a player name', function() {
                expect(player.name).toBe(playerName);
            });
    
            it('should have an attribute', function() {
                expect(player.attributes.length).toBe(1);
    
                let att = player.attributes[0];
                expect(att.name).toBe(attName);
                expect(att.description).toBe(attDescription);
                expect(att.value).toBe(attValue);
            });
    
            it('should have a characteristic', function() {
                expect(player.characteristics.length).toBe(1);
    
                let chr = player.characteristics[0];
                expect(chr.name).toBe(chrName);
                expect(chr.description).toBe(chrDescription);
                expect(chr.value).toBe(chrValue);
            });
    
            it('should have a body part', function() {
                expect(player.bodyParts.length).toBe(1);
    
                let bp = player.bodyParts[0];
                expect(bp.name).toBe(bpName);
                expect(bp.description).toBe(bpDescription);
                expect(bp.characteristics.length).toBe(1);
            });
    
            it('should have an inventory', function() {
                let item = player.inventory.items.next().value;
                expect(item.name).toBe('Item1');
            });
        });

        describe('when the object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name and type', function() {
                expect(config.name).toBe('Player');
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(6);
            });
        });
    });
});