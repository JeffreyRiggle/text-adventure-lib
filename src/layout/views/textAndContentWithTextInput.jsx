import {TextInput} from './textInput.jsx';
import {TextView} from './textView.jsx';
import {ContentView} from './contentView.jsx';

import React from 'react';

export class TextAndContentWithTextInput extends React.Component {
    render() {
        return (<div>
                    <ContentView content={this.props.content}/>
                    <TextView layout={this.props.layout}/>
                    <TextInput layout={this.props.layout}/>
                </div>);
    }
}