import React from 'react';
import ReactDOM from 'react-dom';

export function renderLayout(layout, root) {
    const rLayout = <div dangerouslySetInnerHTML={{__html: layout}}></div>;
    ReactDOM.render(rLayout, root);
}