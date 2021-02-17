import React, { Component } from 'react';
import { delegateNoiseCtxTo, delegateSkinCtxTo, CFG } from './control';

export default class tfp2 extends Component {
  componentDidMount() {
    delegateNoiseCtxTo(
      document.getElementById('tfp2__canvas')
        .getContext('2d', {
          willReadFrequently: true
        })
    );
    delegateSkinCtxTo(
      document.getElementById('tfp2__skin-canvas').getContext('2d')
    );
  }

  onMouseDownHandler = () => {
    window.addEventListener('mousemove', drag);
  }

  render() {
    return (
      <div className="preview__content preview--tfp2">
        <canvas
          className="content__canvas"
          id="tfp2__canvas"
          height="85"
          width="175"
          onMouseDown={this.onMouseDownHandler} />
        <canvas id="tfp2__skin-canvas" />
        <p className="content__caption">Click para arrastrar.</p>
      </div>
    );
  }
}

function drag(m) {
  // Take movement deltas.
  const DRAG_x = -m.movementX;
  const DRAG_Y = -m.movementY;
  // Update settings.
  CFG.traslationX += DRAG_x;
  CFG.traslationY += DRAG_Y;
  // Stop listener.
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', drag);
  });
}
