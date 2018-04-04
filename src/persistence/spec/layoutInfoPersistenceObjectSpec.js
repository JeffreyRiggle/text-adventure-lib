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
    });
});