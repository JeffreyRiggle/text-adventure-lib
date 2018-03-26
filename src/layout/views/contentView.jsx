import React from 'react';

const IsVideoContent = /\.fxm$|\.flv$|\.m3u8$|\.mp4$|\.m4v$/i;
const IsAudioContent = /\.aif$|\.aiff$|\.mp3|\.wav$|\.m4a$/i;
const IsImageContent = /\.svg$|\.tiff$|\.jpeg$|\.jpg$|\.png$|\.gif$|\.bmp$/i;

export class ContentView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (IsVideoContent.test(this.props.content)) {
            return <video src={this.props.content} autoPlay></video>;
        }

        if (IsAudioContent.test(this.props.content)) {
            return <audio src={this.props.content} autoPlay></audio>;
        }

        if (IsImageContent.test(this.props.content)) {
            return <img src={this.props.content}/>;
        }

        return <iframe src={this.props.content} frameBorder={0} width={700}></iframe>;
    }
}