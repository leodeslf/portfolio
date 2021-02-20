import React, { Component } from 'react';
import { initControl } from './control';

export default class tfp extends Component {
  componentDidMount() {
    initControl(document.getElementById('tfp__canvas'));
  }

  render() {
    return (
      <div className="preview__content preview--tfp">
        <canvas
          className="content__canvas"
          id="tfp__canvas"
          height="200"
          width="200" />
        <p className="content__caption">Click para cambiar de modo.</p>
      </div>
    );
  }
}
