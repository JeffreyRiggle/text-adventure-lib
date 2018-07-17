import {LayoutInfoPersistenceObject} from '../layoutInfoPersistenceObject';

describe('LayoutInfoPersistenceObject', function() {
    var obj, id, type, content;

    beforeEach(function() {
        id = 'uid';
        content = 'http://www.somesite/image.png';
        type = 'Custom'

        obj = new LayoutInfoPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            var persistence = {
                children: [
                    {
                        name: 'LayoutID',
                        value: id
                    },
                    {
                        name: 'LayoutContent',
                        value: content
                    },
                    {
                        name: 'LayoutType',
                        value: type
                    }
                ]
            };

            obj.convertFromPersistence(persistence);
        });

        it('should the correct type', function() {
            expect(obj.layoutType).toBe(type);
        });

        it('should have the correct content', function() {
            expect(obj.layoutContent).toBe(content);
        });

        it('should have the correct id', function() {
            expect(obj.layoutId).toBe(id);
        });

        describe('when object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name', function() {
                expect(config.name).toEqual('LayoutInfo');
            });

            it('should have parameters', function() {
                expect(config.children.length).toBe(3);
                expect(config.children[0].name).toEqual('LayoutContent');
                expect(config.children[0].value).toEqual(content);
                expect(config.children[1].name).toEqual('LayoutID');
                expect(config.children[1].value).toEqual(id);
                expect(config.children[2].name).toEqual('LayoutType');
                expect(config.children[2].value).toEqual(type);
            });
        });
    });
});