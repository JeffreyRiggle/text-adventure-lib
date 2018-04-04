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
    });
});