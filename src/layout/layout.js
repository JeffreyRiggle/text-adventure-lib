import React from 'react';
import { renderLayout } from './layoutRenderer.jsx';

export class Layout {
    constructor(templateFactory, initialText) {
        this.initialText = initialText;
        this._textLog = initialText || '';
        this.template = templateFactory(this);
        this._suspended = true;
    }

    get textLog() {
        return this._textLog;
    }

    set textLog(text) {
        this._textLog = text;

        if (this.component && !this._suspended) {
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
        this._suspended = false;

        if (this.component) {
            this.component.forceUpdate();
        }
    }

    suspend() {
        this._suspended = true;
    }
}