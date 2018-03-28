import React from 'react';

export class ButtonInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this._handleInput.bind(this);
    }

    _handleInput(input) {
        this.props.layout.sendMessage(input);
    }

    render() {
        return (
            <div>
                {this.props.buttons.map((btn, i) => 
                    <button key={i} onClick={(e) => this.handleInput(btn)}>{btn}</button>
                )}
            </div>
        );
    }
}