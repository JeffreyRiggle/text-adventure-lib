import {TextInput} from './textInput.jsx';
import {TextView} from './textView.jsx';

import React from 'react';

export class TextWithTextInput extends React.Component {
    render() {
        return (<div>
                    <TextView layout={this.props.layout}/>
                    <TextInput layout={this.props.layout}/>
                </div>);
    }
}