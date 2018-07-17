import {BodyPartPersistenceObject} from '../bodyPartPersistenceObject';

describe('BodyPartPersistenceObject', function() {
    var obj, persist, name, description;

    beforeEach(function() {
        name = 'BodyPart Name';
        description = 'BodyPart Description';

        persist = {
            name: 'BodyPart',
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
                    name: 'Characteristics',
                    children: [
                        {
                            name: 'Characteristic',
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

        obj = new BodyPartPersistenceObject();
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

        it('should have a characteristic', function() {
            expect(obj.characteristics.length).toBe(1);
            expect(obj.characteristics[0].name).toBe('Char1');
            expect(obj.characteristics[0].description).toBe('Test');
            expect(obj.characteristics[0].value).toBe('Foo');
        });

        describe('when object is converted to a body part', function() {
            var bp;

            beforeEach(function() {
                bp = obj.convertToBodyPart();
            });

            it('should have the correct name', function() {
                expect(bp.name).toBe(name);
            });

            it('should have the correct description', function() {
                expect(bp.description).toBe(description);
            });

            it('Should have the correct characteristics', function() {
                expect(bp.characteristics.length).toBe(1);
                expect(bp.characteristics[0].name).toBe('Char1');
                expect(bp.characteristics[0].description).toBe('Test');
                expect(bp.characteristics[0].value).toBe('Foo');
            });
        });

        describe('when the object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('Should have the correct name', function() {
                expect(config.name).toBe('BodyPart');
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(3);
                expect(config.children[2].children.length).toBe(1);
                expect(config.children[2].children[0].children.length).toBe(3);
            });
        });
    });
});