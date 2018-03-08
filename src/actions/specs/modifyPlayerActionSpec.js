import ModifyPlayerAction from '../modifyPlayerAction';
import Player from '../../../node_modules/player-lib/src/player';

describe('ModifyPlayerAction', function() {
    var playerName, modData, action, params, player1, chr1, att1, bp, item, prop;

    beforeEach(function() {
        playerName = 'Player1';
        modData = {
            args: {}
        };

        chr1 = {
            name: 'CharacteristicTest',
            value: 12
        };

        att1 = {
            name: 'AttributeTest',
            value: 46
        };

        bp = {
            name: 'FooBP'
        };

        prop = {
            name: 'SomeTestProp'
        };

        item = {
            name: 'SomeTestItem',
            properties: [prop],
            addProperty: function(prop) {
                this.properties.push(prop);
            },
            removeProperty: function(prop) {
                var ind = this.properties.indexOf(prop);
                if (ind !== -1) {
                    this.properties.splice(ind, 1);
                }
            }
        };

        player1 = new Player(playerName);
        player1.characteristics.push(chr1);
        player1.attributes.push(att1);

        player1.equipment.equip(bp, item);

        params = {
            players: [player1]
        };

        action = new ModifyPlayerAction(playerName, modData);
    });

    describe('when modification object is player', function() {
        var newName;
        beforeEach(function() {
            newName = 'PlayerTest';
            modData.args.modificationObject = 'Player';
            modData.args.data = newName;
        });

        describe('and modification type is change', function() {
            beforeEach(function() {
                modData.modificationType = 'Change';
                action.execute(params);
            });

            it('should update the players name', function() {
                expect(player1.name).toBe(newName);
            });
        });
    });

    describe('when modification object is characteristic', function() {
        var chr;
        beforeEach(function() {
            chr = {
                name: 'testchr',
                value: 'test'
            };
            modData.args.modificationObject = 'Characteristic';
        });

        describe('and modification type is add', function() {
            beforeEach(function() {
                modData.modificationType = 'Add';
                modData.args.data = chr;
                action.execute(params);
            });

            it('should add the characteristic', function() {
                expect(player1.characteristics).toContain(chr);
            });
        });

        describe('and modification type is remove', function() {
            beforeEach(function() {
                modData.modificationType = 'Remove';
                modData.args.data = chr1;
                action.execute(params);
            });

            it('should remove the characteristic', function() {
                expect(player1.characteristics).not.toContain(chr1);
            });
        });

        describe('and the modification type is change', function() {
            beforeEach(function() {
                modData.modificationType = 'Change';
                modData.args.id = chr1.name;
            });

            describe('and the change type is assign', function() {
                beforeEach(function() {
                    modData.args.changeType = 'Assign';
                    modData.args.data = 'NewVal';
                    action.execute(params);
                });

                it('should assign a new value', function() {
                    expect(chr1.value).toBe('NewVal');
                });
            });

            describe('and the change type is add', function() {
                beforeEach(function() {
                    modData.args.changeType = 'Add';
                    modData.args.data = 2;
                    action.execute(params);
                });

                it('should add to the current value', function() {
                    expect(chr1.value).toBe(14);
                });
            });

            describe('and the change type is subtract', function() {
                beforeEach(function() {
                    modData.args.changeType = 'Subtract';
                    modData.args.data = 2;
                    action.execute(params);
                });

                it('should subtract from the current value', function() {
                    expect(chr1.value).toBe(10);
                });
            });
        });
    });

    describe('when modification object is attribute', function() {
        var att;
        beforeEach(function() {
            att = {
                name: 'testattrib',
                value: 'testing'
            };
            modData.args.modificationObject = 'Attribute';
        });

        describe('and modification type is add', function() {
            beforeEach(function() {
                modData.modificationType = 'Add';
                modData.args.data = att;
                action.execute(params);
            });

            it('should add the attribute', function() {
                expect(player1.attributes).toContain(att);
            });
        });

        describe('and modification type is remove', function() {
            beforeEach(function() {
                modData.modificationType = 'Remove';
                modData.args.data = att1;
                action.execute(params);
            });

            it('should remove the attribute', function() {
                expect(player1.attributes).not.toContain(att1);
            });
        });

        describe('and the modification type is change', function() {
            beforeEach(function() {
                modData.modificationType = 'Change';
                modData.args.id = att1.name;
            });

            describe('and the change type is assign', function() {
                beforeEach(function() {
                    modData.args.changeType = 'Assign';
                    modData.args.data = 'NewVal';
                    action.execute(params);
                });

                it('should assign a new value', function() {
                    expect(att1.value).toBe('NewVal');
                });
            });

            describe('and the change type is add', function() {
                beforeEach(function() {
                    modData.args.changeType = 'Add';
                    modData.args.data = 3;
                    action.execute(params);
                });

                it('should add to the current value', function() {
                    expect(att1.value).toBe(49);
                });
            });

            describe('and the change type is subtract', function() {
                beforeEach(function() {
                    modData.args.changeType = 'Subtract';
                    modData.args.data = 3;
                    action.execute(params);
                });

                it('should subtract from the current value', function() {
                    expect(att1.value).toBe(43);
                });
            });
        });
    });

    describe('when modification object is equipment', function() {
        var item1, bp1;

        beforeEach(function() {
            item1 = {
                name: 'TestItem'
            };

            bp1 = {
                name: 'TestBod1'
            };

            modData.args.modificationObject = 'Equipment';
        });

        describe('and modification type is add', function() {
            beforeEach(function() {
                modData.modificationType = 'Add';
                modData.args.id = bp1;
                modData.args.data = item1;
                action.execute(params);
            });

            it('should equip the item', function() {
                expect(player1.equipment.getEquip(bp1)).toBe(item1);
            });
        });

        describe('and modification type is remove', function() {
            beforeEach(function() {
                modData.modificationType = 'Remove';
                modData.args.id = bp;
                action.execute(params);
            });

            it('should unEquip the item', function() {
                expect(player1.equipment.getEquip(bp)).toBeUndefined();
            });
        });

        describe('and the modification type is change', function() {
            beforeEach(function() {
                modData.modificationType = 'Change';
                modData.args.id = bp;
            });

            describe('and the change type is assign', function() {
                beforeEach(function() {
                    modData.args.changeType = 'Assign';
                    modData.args.data = item1;
                    action.execute(params);
                });

                it('should update the item', function() {
                    expect(player1.equipment.getEquip(bp)).toBe(item1);
                });
            });

            describe('and the change type is add', function() {
                var prop1;

                beforeEach(function() {
                    prop1 = {
                        name: 'TestProp'
                    };

                    modData.args.changeType = 'Add';
                    modData.args.data = prop1;
                    action.execute(params);
                });

                it('should add a property to the item', function() {
                    expect(item.properties).toContain(prop1);
                });
            });

            describe('and the change type is subtract', function() {
                beforeEach(function() {
                    modData.args.changeType = 'Subtract';
                    modData.args.data = prop;
                    action.execute(params);
                });

                it('should remove a property from the item', function() {
                    expect(item.properties).not.toContain(prop);
                });
            });
        });
    });

    describe('when modification object is inventory', function() {
        describe('and modification type is add', function() {
            it('should add the item', function() {

            });
        });

        describe('and modification type is remove', function() {
            it('should remove the item', function() {

            });
        });

        describe('and the modification type is change', function() {
            describe('and the change data is a number', function() {
                it('should update the item amount', function() {

                });
            });
            
            describe('and the change type is assign', function() {
                it('should update the item', function() {

                });
            });

            describe('and the change type is add', function() {
                it('should add a property to the item', function() {

                });
            });

            describe('and the change type is subtract', function() {
                it('should remove a property from the item', function() {

                });
            });
        });
    });

    describe('when modification object is body part', function() {
        describe('and modification type is add', function() {
            it('should add the body part', function() {

            });
        });

        describe('and modification type is remove', function() {
            it('should remove the body part', function() {

            });
        });

        describe('and the modification type is change', function() {
            describe('and the change type is assign', function() {
                it('should assign a new value', function() {

                });
            });

            describe('and the change type is add', function() {
                it('should add a characteristic to the body part', function() {

                });
            });

            describe('and the change type is subtract', function() {
                it('should remove a characteristic from the body part', function() {

                });
            });
        });
    });
});