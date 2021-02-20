import React, { Component } from 'react';
import { Vec2 } from '../../js/vec.min';
import { delegateNoiseCtxTo, delegateSkinCtxTo, CFG } from './control';

const touchAt = new Vec2(0, 0);
const touchTo = new Vec2(0, 0);

export default class tfp2 extends Component {
  componentDidMount() {
    let canvas = document.getElementById('tfp2__canvas');

    delegateNoiseCtxTo(canvas.getContext('2d'));
    delegateSkinCtxTo(
      document.getElementById('tfp2__skin-canvas').getContext('2d')
    );

    canvas.addEventListener('mousedown', () => {
      window.addEventListener('mousemove', drag);
    });

    canvas.addEventListener('touchstart', t => {
      // Set movement "start" position.
      touchAt.copy({ x: t.touches[0].pageX, y: t.touches[0].pageY });
      window.addEventListener('touchmove', drag, { passive: false });
    }, { passive: false });
  }

  render() {
    return (
      <div className="preview__content preview--tfp2">
        <canvas
          className="content__canvas"
          id="tfp2__canvas"
          height="85"
          width="175" />
        <canvas id="tfp2__skin-canvas" />
        <p className="content__caption">Click para arrastrar.</p>
      </div>
    );
  }
}

function drag(e) {
  // Take movement deltas.
  const gap = new Vec2(0, 0);

  switch (e.type) {
    case 'mousemove':
      gap.copy({ x: e.movementX, y: e.movementY });
      // Stop listener.
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', drag);
      });
      break;
    case 'touchmove':
      e.preventDefault();
      // Set movement "end" position.
      touchTo.copy({ x: e.touches[0].pageX, y: e.touches[0].pageY });
      gap.copy(Vec2.subtract(touchTo, touchAt));
      // Update "start" position to next iteration at same event.
      touchAt.copy(touchTo);
      // Stop listener.
      window.addEventListener('touchend', () => {
        window.removeEventListener('touchmove', drag);
      });
      break;
    default: return;
  }

  // Update settings.
  CFG.traslation.subtract(gap);
}
