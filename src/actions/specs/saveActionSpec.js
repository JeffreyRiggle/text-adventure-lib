import { SaveAction } from '../saveAction';
import * as fm from '../../core/fileManager';

describe('SaveAction', function() {
    var action, data, fileName, player1, saveSpy;

    beforeEach(function() {
        saveSpy = spyOn(fm, 'save');
        data = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><TextAdventure inlineLayouts="true" inlinegamestate="true" inlineplayers="true"><Name ValueType="string">BrowserTest</Name><Transition><DisplayType/><MediaLocation ValueType="string">1306303884742.jpg</MediaLocation></Transition><CurrentGameState>SomeGS</CurrentGameState><Players><Player><Name ValueType="string">player1</Name><Attributes><NamedObject type="Attribute"><Name ValueType="string">PlayerName</Name><Description ValueType="string">The name of the player</Description><Value ValueType="string">TestPlayer</Value></NamedObject></Attributes><Characteristics/><BodyParts/><Inventory/><Equipment/></Player></Players><GameStates><GameState><StateId ValueType="string">Start</StateId><LayoutInfo><LayoutID ValueType="string"/><LayoutType ValueType="object">TextWithButtonInput</LayoutType><LayoutContent ValueType="string"/></LayoutInfo><TextLog ValueType="string">Greetings {[player&lt;&lt;player1&gt;&gt;@attribute&lt;&lt;PlayerName&gt;&gt;@value]}!</TextLog><Options><Option><Triggers><Trigger type="Text"><Parameters><Text ValueType="string">Continue</Text><CaseSensitive ValueType="bool">true</CaseSensitive></Parameters></Trigger></Triggers><Action type="Completion"><Parameters><CompletionData ValueType="string">gs2</CompletionData></Parameters></Action></Option></Options><Timers/></GameState><GameState><StateId ValueType="string">gs2</StateId><LayoutInfo><LayoutID ValueType="string"/><LayoutType ValueType="object">TextAndContentWithButtonInput</LayoutType><LayoutContent ValueType="string">1310993122858.jpg</LayoutContent></LayoutInfo><TextLog ValueType="string">This is the second game state it has some content.</TextLog><Options><Option><Triggers><Trigger type="Text"><Parameters><Text ValueType="string">Continue</Text><CaseSensitive ValueType="bool">true</CaseSensitive></Parameters></Trigger></Triggers><Action type="Completion"><Parameters><CompletionData ValueType="string">gs3</CompletionData></Parameters></Action></Option></Options><Timers/></GameState><GameState><StateId ValueType="string">gs3</StateId><LayoutInfo><LayoutID ValueType="string"/><LayoutType ValueType="object">TextWithTextInput</LayoutType><LayoutContent ValueType="string"/></LayoutInfo><TextLog ValueType="string">This is the last game state. Type finish to end game.</TextLog><Options><Option><Triggers><Trigger type="Text"><Parameters><Text ValueType="string">finish</Text></Parameters></Trigger></Triggers><Action type="Finish"><Parameters/></Action></Option></Options><Timers/></GameState></GameStates><Layouts/><Buffer ValueType="int">0</Buffer></TextAdventure>';
        fileName = 'save1.xml'
        player1 = {
            name: 'TestPlayer',
            attributes: [],
            characteristics: [],
            bodyParts: [],
            inventory: {
                itemMap: new Map()
            },
            equipment: {
                equiped: new Map()
            }
        };

        action = new SaveAction(fileName, data);
    });

    it('should have the correct persisted players', function() {
        expect(action.manager.textAdventure.players[0].playerName).toBe('player1');
    });

    it('should have the correct current game state', function() {
        expect(action.manager.textAdventure.currentGameState).toBe('SomeGS');
    });

    describe('when execute is called', function() {
        beforeEach(function() {
            action.execute({
                players: [player1],
                currentGameState: 'gamestate2'
            });
        });

        it('should update the persisted players', function() {
            expect(action.manager.textAdventure.players[0].playerName).toBe('TestPlayer');
        });

        it('should update the current game state', function() {
            expect(action.manager.textAdventure.currentGameState).toBe('gamestate2');
        });

        it('should save the game', function() {
            expect(saveSpy).toHaveBeenCalled();
        });
    });
});