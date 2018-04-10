import {FinishActionPersistenceObject} from '../finishActionPersistenceObject';

describe('FinishActionPersistenceObject', function() {
    var obj, persist;

    beforeEach(function() {
        persist = {};
        obj = new FinishActionPersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        describe('when object is converted to action', function() {
            var action;

            beforeEach(function() {
                action = obj.convertToAction();
            });

            it('should create a finish action', function() {
                expect(action.finishedEvent).not.toBeUndefined();
            });
        });
    });
});