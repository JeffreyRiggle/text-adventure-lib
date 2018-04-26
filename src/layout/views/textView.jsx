import React from 'react';

export class TextView extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            resize: 'none',
            width: '100%',
            height: '100%'
        };
    }

    render() {
        return (
            <div>
                <textarea style={this.style} value={this.props.layout.textLog} readOnly/>
            </div>
        );
    }
}