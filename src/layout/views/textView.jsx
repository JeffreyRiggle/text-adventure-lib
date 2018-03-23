import React from 'react';

export class TextView extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            resize: 'none',
            width: '100%',

        };
    }

    render() {
        return (
            <div>
                <textarea style={this.style} defaultValue={this.props.initialText} readOnly/>
            </div>
        );
    }
}