import {GameStatePersistenceObject} from '../gameStatePersistenceObject';

describe('GameStatePersistenceObject', function() {
    var obj, persist, gameStateId, textLog;

    beforeEach(function() {
        gameStateId = 'GameState1';
        textLog = 'This is a text log';

        let tm = new Map();
        let am = new Map();
        let tmm = new Map();

        tm.set('type', 'Text');
        am.set('type', 'AppendText');
        tmm.set('type', 'Completion');

        persist = {
            name: 'GameState',
            children: [
                {
                    name: 'StateId',
                    value: gameStateId
                },
                {
                    name: 'TextLog',
                    value: textLog
                },
                {
                    name: 'Options',
                    children: [
                        {
                            name: 'Option',
                            children: [
                                {
                                    name: 'Triggers',
                                    children: [
                                        {
                                            name: 'Trigger',
                                            properties: tm,
                                            children: [
                                                {
                                                    name: 'Parameters',
                                                    children: [
                                                        {
                                                            name: 'Text',
                                                            value: 'Foo'
                                                        },
                                                        {
                                                            name: 'MatchType',
                                                            value: 'Contains'
                                                        },
                                                        {
                                                            name: 'CaseSensitive',
                                                            value: 'false'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'Action',
                                    properties: am,
                                    children: [
                                        {
                                            name: 'Parameters',
                                            children: [
                                                {
                                                    name: 'AppendText',
                                                    value: 'Something'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Timers',
                    children: [
                        {
                            name: 'Timer',
                            properties: tmm,
                            children: [
                                {
                                    name: 'CompletionData',
                                    value: 'test'
                                },
                                {
                                    name: 'Duration',
                                    value: '1000'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'LayoutInfo',
                    children: [
                        {
                            name: 'LayoutID',
                            value: 'id'
                        },
                        {
                            name: 'LayoutContent',
                            value: 'content'
                        },
                        {
                            name: 'LayoutType',
                            value: 'Custom'
                        }
                    ]
                }
            ]
        };
        obj = new GameStatePersistenceObject();
    });

    describe('when object is converted from persistence', function() {
        beforeEach(function() {
            obj.convertFromPersistence(persist);
        });

        it('should have a state id', function() {
            expect(obj.stateId).toEqual(gameStateId);
        });

        it('should have a text log', function() {
            expect(obj.textLog).toEqual(textLog);
        });


        it('should have an option', function() {
            expect(obj.options.length).toBe(1);
        });

        it('should have a timed action', function() {
            expect(obj.timers.length).toBe(1);
        });

        it('should have layout info', function() {
            expect(obj.layout.layoutId).toBe('id');
        });

        describe('when object is converted to a game state', function() {
            var gs;

            beforeEach(function() {
                gs = obj.convertToGameState();
            });
    
            it('should have an option', function() {
                expect(gs.options.length).toBe(1);
            });
    
            it('should have a timed action', function() {
                expect(gs.timers.length).toBe(1);
            });
        });

        describe('when object is converted to config', function() {
            var config;

            beforeEach(function() {
                config = obj.convertToConfig();
            });

            it('should have the correct name', function() {
                expect(config.name).toEqual('GameState');
            });

            it('should have the correct children', function() {
                expect(config.children.length).toEqual(5);
            });
        });
    });
});