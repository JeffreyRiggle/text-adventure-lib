import {TransitionPersistenceObject} from '../transitionPersistenceObject';

describe('TransitionPersistenceObject', function() {
    var obj, displayType, mediaLocation;

    beforeEach(function() {
        displayType = 'SplashScreen';
        mediaLocation = 'http://www.somesite/image.png';

        obj = new TransitionPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            var persistence = {
                children: [
                    {
                        name: 'DisplayType',
                        value: displayType
                    },
                    {
                        name: 'MediaLocation',
                        value: mediaLocation
                    }
                ]
            };

            obj.convertFromPersistence(persistence);
        });

        it('should have a display type', function() {
            expect(obj.displayType).toBe(displayType);
        });

        it('should have a media location', function() {
            expect(obj.mediaLocation).toBe(mediaLocation);
        });

        describe('when object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name', function() {
                expect(config.name).toEqual('Transition');
            });

            it('should have the correct children', function() {
                expect(config.children.length).toBe(2);
                expect(config.children[0].value).toBe(displayType);
                expect(config.children[1].value).toBe(mediaLocation);
            });
        });
    });
});