import React from 'react';
import { renderLayout } from './layoutRenderer.jsx';

export class Layout {
    constructor(templateFactory, initialText) {
        this.initialText = initialText;
        this._textLog = initialText;
        this.template = templateFactory(this);
    }

    get textLog() {
        return this._textLog;
    }

    set textLog(text) {
        this._textLog = text;
        this.component.forceUpdate();
    }

    sendMessage(text) {
        if (this.messageCallback) {
            console.log('Got send message request');
            this.messageCallback(text);
            this.textLog = this.textLog + '\n' + text;
        }
    }

    render(root) {
        this.root = root;
        this.component = renderLayout(this.template, root);
    }

    animate() {
        if (this.component) {
            this.component.forceUpdate();
        }
    }

    suspend() {
        
    }
}