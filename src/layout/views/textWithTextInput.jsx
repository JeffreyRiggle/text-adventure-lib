import {TextInput} from './textInput.jsx';
import {TextView} from './textView.jsx';
import './viewStyles.css';

import React from 'react';

export class TextWithTextInput extends React.Component {
    render() {
        return (<div>
                    <div className="twti-text-area">
                        <TextView layout={this.props.layout}/>
                    </div>
                    <div className="twti-text-input-area">
                        <TextInput layout={this.props.layout}/>
                    </div>
                </div>);
    }
}