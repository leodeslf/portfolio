import React, { Component } from 'react';
import { delegateNoiseCtxTo } from './control';

export default class tfp extends Component {
  componentDidMount() {
    delegateNoiseCtxTo(
      document.getElementById('tfp__canvas').getContext('2d')
    );
  }

  render() {
    return (
      <div className="preview__content preview--tfp">
        <canvas
          className="content__canvas"
          id="tfp__canvas"
          height="85"
          width="175" />
      </div>
    );
  }
}
