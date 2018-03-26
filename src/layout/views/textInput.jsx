import React from 'react';

export class TextInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.style = {
            width: '100%'
        };

        this.handleKeyPressed = this._handleKeyPressed.bind(this);
        this.handleChange = this._handleChange.bind(this);
    }

    _handleInput() {
        this.props.gameState.sendMessage(this.state.text);
        this.setState({
            text: ''
        });
    }

    _handleKeyPressed(event) {
        let key = event.key;

        if (key === 'Enter') {
            this._handleInput();
            return;
        }
    }

    _handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    value={this.state.text}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPressed}
                    style={this.style}/>
            </div>
        );
    }
}