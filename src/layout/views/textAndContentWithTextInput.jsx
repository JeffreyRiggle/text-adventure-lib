import {TextInput} from './textInput.jsx';
import {TextView} from './textView.jsx';
import {ContentView} from './contentView.jsx';

import React from 'react';

export class TextAndContentWithTextInput extends React.Component {
    render() {
        return (<div className="layout-container">
                    <div className="tacwti-content-area">
                        <ContentView content={this.props.content}/>
                    </div>
                    <div className="tacwti-text-area">
                        <TextView layout={this.props.layout}/>
                    </div>
                    <div className="tacwti-text-input-area">
                        <TextInput layout={this.props.layout}/>
                    </div>
                </div>);
    }
}