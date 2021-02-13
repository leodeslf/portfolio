import React, { Component } from 'react';
import { delegateNoiseCtxTo, CFG } from './control';

export default class tfp2 extends Component {
  componentDidMount() {
    initPreview();
  }

  onMouseDownHandler = () => {
    window.onmousemove = (m) => {
      // Take movement deltas.
      const DRAG_x = -m.movementX;
      const DRAG_Y = -m.movementY;
      // Update settings.
      CFG.traslationX += DRAG_x;
      CFG.traslationY += DRAG_Y;
      // Stop listener.
      window.onmouseup = () => {
        window.onmousemove = null;
      }
    }
  }

  render() {
    return (
      <div className="preview--tfp2 preview-content">
        <canvas id="canvas--tfp2" height="100" width="200" onMouseDown={this.onMouseDownHandler} />
      </div>
    );
  }
}

function initPreview() {
  delegateNoiseCtxTo(
    document.getElementById('canvas--tfp2')
      .getContext('2d', {
        willReadFrequently: true
      })
  );
}