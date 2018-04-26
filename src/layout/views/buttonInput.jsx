import React from 'react';
import './viewStyles.css';

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
            <div className="btn-container">
                {this.props.buttons.map((btn, i) => 
                    <button key={i} onClick={(e) => this.handleInput(btn)} className="btn-input-item">{btn}</button>
                )}
            </div>
        );
    }
}