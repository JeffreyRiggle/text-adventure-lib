import {ScriptedTriggerPersistenceObject} from '../scriptedTriggerPersistenceObject';

describe('ScriptedTriggerPersistenceObject', function() {
    var obj, persistence, encodedScript, originalScript;

    beforeEach(function() {
        originalScript = '(function() { function shouldFire(data) { return true; } return { shouldFire: shouldFire }})()';
        encodedScript = btoa(originalScript);

        persistence = {
            children: [
                {
                    name: 'Parameters',
                    children: [
                        {
                            name: 'Script',
                            value: encodedScript
                        }
                    ]
                }
            ]
        };

        obj = new ScriptedTriggerPersistenceObject();
    });

    describe('when persistence is converted', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persistence);
        });

        it('should have a script property', function() {
            expect(obj.script).toBe(originalScript);
        });

        describe('when object is converted into a trigger', function() {
            var trigger;

            beforeEach(function() {
                trigger = obj.convertToTrigger();
            });

            it('properly evaluate the script in the trigger', function() {
                expect(trigger.shouldFire({})).toBe(true);
            });
        });
    });
});