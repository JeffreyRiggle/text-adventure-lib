import React from 'react';
import { renderLayout } from './layoutRenderer.jsx';

export class Layout {
    constructor(templateFactory, initialText) {
        this.initialText = initialText;
        this._textLog = initialText || '';
        this.template = templateFactory(this);
    }

    get textLog() {
        return this._textLog;
    }

    set textLog(text) {
        this._textLog = text;

        if (this.component) {
            this.component.forceUpdate();
        }
    }

    sendMessage(text) {
        if (this.messageCallback) {
            this.textLog = this.textLog + '\n' + text;
            this.messageCallback(text);
        }
    }

    render(root) {
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