import React, { Component } from 'react'
import { Vec2 } from '../../js/vec.min';
import { chain, initControl, joints } from './control'

// Canvas offset on page.
let canvasOffset = new Vec2(0, 0);

export default class ik extends Component {
  componentDidMount() {
    let canvas = document.getElementById('ik__canvas')
    initControl(canvas.getContext('2d'));

    canvas.addEventListener('mousedown', () => chain.anchor = false);

    canvas.addEventListener('mousemove', m => {
      // Position on canvas.
      chain.target = Vec2.fromCopy({ x: m.offsetX, y: m.offsetY });

      window.addEventListener('mouseup', () => {
        chain.anchor = Vec2.fromCopy(chain.body[joints - 1].base);
      });
    });

    canvas.addEventListener('touchstart', () => {
      // Canvas offset on page.
      canvasOffset.copy(new Vec2(canvas.offsetLeft, canvas.offsetTop));
      window.addEventListener('touchmove', drag, { passive: false });
    }, { passive: false });
  }

  render() {
    return (
      <div className="preview__content preview--ik">
        <canvas
          className="content__canvas"
          id="ik__canvas"
          height="200"
          width="200" />
        <p className="content__caption">Click para desanclar y arrastar.</p>
      </div>
    )
  }
}

function drag(e) {
  e.preventDefault();

  // Take difference as canvas position for target,
  // as "offset" doesn't exist on touch events.
  chain.target = Vec2.subtract(
    { x: e.touches[0].pageX, y: e.touches[0].pageY },
    canvasOffset
  );

  window.addEventListener('touchend', () => {
    window.removeEventListener('touchmove', drag);
  });
}
