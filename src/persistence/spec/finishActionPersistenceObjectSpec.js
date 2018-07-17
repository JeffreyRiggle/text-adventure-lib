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

        describe('when object is converted to config', function() {
            var config;
    
            beforeEach(function() {
                config = obj.convertToConfig();
            });
    
            it('should have the correct name', function() {
                expect(config.name).toEqual('Action');
            });
    
            it('should have the correct type', function() {
                expect(config.properties.get('type')).toEqual('Finish');
            });
        });
    });
});