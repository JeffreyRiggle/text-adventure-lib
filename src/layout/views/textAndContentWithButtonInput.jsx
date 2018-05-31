import {ButtonInput} from './buttonInput.jsx';
import {TextView} from './textView.jsx';
import {ContentView} from './contentView.jsx';

import React from 'react';

export class TextAndContentWithButtonInput extends React.Component {
    render() {
        return (<div className="layout-container">
                    <div className="tacwbi-content-area">
                        <ContentView content={this.props.content}/>
                    </div>
                    <div className="tacwbi-text-area">
                        <TextView layout={this.props.layout}/>
                    </div>
                    <div className="tacwbi-btn-input-area">
                        <ButtonInput layout={this.props.layout} buttons={this.props.buttons}/>
                    </div>
                </div>);
    }
}