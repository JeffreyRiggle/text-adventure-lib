import { Layout } from '../layout/layout';
import { TextWithTextInput } from '../layout/views/textWithTextInput.jsx';
import { TextWithButtonInput } from '../layout/views/textWithButtonInput.jsx';
import { ContentView } from '../layout/views/contentView.jsx';
import { TextAndContentWithTextInput } from '../layout/views/textAndContentWithTextInput.jsx';
import { TextAndContentWithButtonInput } from '../layout/views/textAndContentWithButtonInput.jsx';

const convertLayout = (layout, textLog, buttons) => {
    let content = layout.layoutContent;

    if (layout.layoutType === 'TextWithTextInput') {
        return new Layout((layout) => {
            return <TextWithTextInput layout={layout}/>
        }, textLog);
    }
    if (layout.layoutType === 'TextWithButtonInput') {
        return new Layout((layout) => {
            return <TextWithButtonInput layout={layout} buttons={buttons}/>
        }, textLog);
    }
    if (layout.layoutType === 'ContentOnly') {
        return new Layout((layout) => {
            return <ContentView content={content}/>
        }, textLog);
    }
    if (layout.layoutType === 'TextAndContentWithTextInput') {
        return new Layout((layout) => {
            return <TextAndContentWithTextInput content={content} layout={layout}/>
        }, textLog);
    }
    if (layout.layoutType === 'TextAndContentWithButtonInput') {
        return new Layout((layout) => {
            return <TextAndContentWithButtonInput content={content} layout={layout} buttons={buttons}/>
        }, textLog);
    }

    //this is custom area
};

export {
    convertLayout
}