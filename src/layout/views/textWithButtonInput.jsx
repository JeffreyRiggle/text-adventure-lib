import {ButtonInput} from './buttonInput.jsx';
import {TextView} from './textView.jsx';
import './viewStyles.css';

import React from 'react';

export class TextWithButtonInput extends React.Component {
    render() {
        return (<div className="layout-container">
                    <div className="twbi-text-area">
                        <TextView layout={this.props.layout}/>
                    </div>
                    <div className="twbi-btn-input-area">
                        <ButtonInput layout={this.props.layout} buttons={this.props.buttons}/>
                    </div>
                </div>);
    }
}