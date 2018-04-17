import { TextAdventureGameState } from '../textAdventureGameState';

describe('TextAdventureGameState', function() {
    var gameState, 
        layout,
        option1,
        triggerOption1,
        option2, 
        triggerOption2,
        timer1,
        timer2,
        macro,
        macroChange;

    beforeEach(function() {
        layout = {
            textLog: '',
            animateCount: 0,
            animate: function() {
                this.animateCount++;
            },
            suspendCount: 0,
            suspend: function() {
                this.suspendCount++;
            }
        };

        option1 = {
            action: {
                executed: false,
                execute: function() {
                    this.executed = true;
                }
            },
            shouldTrigger: function() {
                return triggerOption1;
            }
        };

        option2 = {
            action: {
                executed: false,
                execute: function() {
                    this.executed = true;
                }
            },
            shouldTrigger: function() {
                return triggerOption2;
            }
        };

        timer1 = {
            startCount: 0,
            action: {},
            start: function() {
                this.startCount++;
            },
            stopCount: 0,
            stop: function() {
                this.stopCount++;
            }
        };

        timer2 = {
            startCount: 0,
            action: {},
            start: function() {
                this.startCount++;
            },
            stopCount: 0,
            stop: function() {
                this.stopCount++;
            }
        };

        macroChange = 'macro processed';

        macro = {
            players: [],
            substitute: function(input) {
                return input + macroChange;
            }
        };

        gameState = new TextAdventureGameState(layout, [option1, option2], [timer1, timer2], [macro]);
    });

    describe('when game state is ran', function() {
        var runData, player1, player2;

        beforeEach(function() {
            player1 = {name: 'player1'};
            player2 = {name: 'player2'};

            runData = {
                players: [
                    player1,
                    player2
                ],
                currentGameState: 'testGameState',
                textLog: 'Some Text Log'
            };

            gameState.run(runData);
        });

        it('should update macros with runtime data', function() {
            expect(macro.players).toEqual([player1, player2]);
        });

        it('should set the text log and run the macro', function() {
            expect(gameState.textLog).toEqual(runData.textLog + '\n' + macroChange);
        });

        it('should animate the layout', function() {
            expect(layout.animateCount).toBe(1);
        });

        it('should start the timers', function() {
            expect(timer1.startCount).toBe(1);
            expect(timer2.startCount).toBe(1);
        });

        it('should have the correct players', function() {
            expect(gameState.players).toEqual([player1, player2]);
        });

        it('should have the correct game state', function() {
            expect(gameState.stateId).toEqual(runData.currentGameState);
        });

        describe('when a message is sent', function() {
            var message;

            beforeEach(function() {
                message = 'foo';    
            });

            describe('and there is no matching trigger', function() {
                beforeEach(function() {
                    triggerOption1 = false;
                    triggerOption2 = false;
                    gameState.sendMessage(message);
                });

                it('should not fire any actions', function() {
                    expect(option1.action.executed).toBe(false);
                    expect(option2.action.executed).toBe(false);
                });
            });

            describe('and there is a matching trigger', function() {
                beforeEach(function() {
                    triggerOption1 = false;
                    triggerOption2 = true;
                    gameState.sendMessage(message);
                });

                it('should fire the action', function() {
                    expect(option1.action.executed).toBe(false);
                    expect(option2.action.executed).toBe(true);
                });
            });
        });

        describe('when a non processed message is sent', function() {
            beforeEach(function() {
                gameState.sendMessageNoProcessing('foo');  
            });

            it('should update the text log with any macros', function() {
                expect(gameState.textLog).toEqual(runData.textLog + '\n' + macroChange + '\nfoo' + macroChange);
            });
        });

        describe('when the game state is completed', function() {
            var completionData, completedCount;

            beforeEach(function() {
                completionData = {};
                completedCount = 0;

                gameState.on(gameState.completedEvent, function() {
                    completedCount++;
                });

                gameState.completed(completionData);
            });

            it('should raise a completed event', function() {
                expect(completedCount).toBe(1);
            });

            it('should suspend the layout', function() {
                expect(layout.suspendCount).toBe(1);
            });

            it('should stop the timers', function() {
                expect(timer1.stopCount).toBe(1);
                expect(timer2.stopCount).toBe(1);
            });
        });
    });
});