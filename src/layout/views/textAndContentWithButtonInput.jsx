import {ButtonInput} from './buttonInput.jsx';
import {TextView} from './textView.jsx';
import {ContentView} from './contentView.jsx';

import React from 'react';

export class TextAndContentWithButtonInput extends React.Component {
    render() {
        return (<div>
                    <ContentView content={this.props.content}/>
                    <TextView layout={this.props.layout}/>
                    <ButtonInput buttons={this.props.buttons}/>
                </div>);
    }
}