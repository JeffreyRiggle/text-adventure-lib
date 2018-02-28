import React from 'react';

class ButtonInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInput(input) {
        //TODO have this send a message
        console.log(`Got input ${input}`);
    }

    render() {
        return (
            <div>
                {this.props.buttons.map((btn) => 
                    <button onClick={(e) => this.handleInput(btn)}>{btn}</button>
                )}
            </div>
        );
    }
}

export default ButtonInput;