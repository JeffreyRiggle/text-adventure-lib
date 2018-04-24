import {ButtonInput} from './buttonInput.jsx';
import {TextView} from './textView.jsx';

import React from 'react';

export class TextWithButtonInput extends React.Component {
    render() {
        return (<div>
                    <TextView layout={this.props.layout}/>
                    <ButtonInput layout={this.props.buttons}/>
                </div>);
    }
}