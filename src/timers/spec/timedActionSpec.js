import {TimedAction} from '../timedAction';

describe('TimedAction', function() {
    var timer, action, duration;

    beforeEach(function() {
        jasmine.clock().install();
        action = {
            executed: false,
            execute: function() {
                this.executed = true;
            }
        };

        duration = 100;

        timer = new TimedAction(action, duration);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    describe('when timer is started', function() {
        beforeEach(function() {
            timer.start();
        });

        describe('and the timer elapses', function() {
            beforeEach(function() {
                jasmine.clock().tick(duration);
                jasmine.clock().tick(1);
            });

            it('should execute the action', function() {
                expect(action.executed).toBe(true);
            });
        });

        describe('when the timer is stopped', function() {
            beforeEach(function() {
                timer.stop();
                jasmine.clock().tick(duration);
                jasmine.clock().tick(1);
            });

            it('should not execute the action', function() {
                expect(action.executed).toBe(false);
            });
        });
    });
});