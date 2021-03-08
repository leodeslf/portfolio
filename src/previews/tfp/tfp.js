import React, { Component } from 'react';
import { initControl } from './control';

export default class tfp extends Component {
  componentDidMount() {
    initControl(document.getElementById('tfp__canvas'));
  }

  render() {
    return (
      <div className="preview__main preview--tfp">
        <canvas
          className="preview__canvas preview__body"
          id="tfp__canvas"
          height="200"
          width="200" />
        <p className="preview__caption">Click para cambiar de modo.</p>
      </div>
    );
  }
}
