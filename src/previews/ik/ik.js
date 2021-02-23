import React, { Component } from 'react'
import { Vec2 } from '../../js/vec.min';
import { chain, initControl, joints } from './control'

// Canvas offset on page.
let canvasOffset = new Vec2(0, 0);

export default class ik extends Component {
  componentDidMount() {
    let canvas = document.getElementById('ik__canvas')
    initControl(canvas.getContext('2d'));

    canvas.addEventListener('mousedown', () => {
      chain.anchor = false;
      canvasOffset.xy = [canvas.offsetLeft, canvas.offsetTop];

      window.addEventListener('mouseup', () => {
        chain.anchor = Vec2.clone(chain.body[joints - 1].base);
      });
    });

    window.addEventListener('mousemove', e => {
      canvasOffset.xy = [canvas.offsetLeft, canvas.offsetTop];
      chain.target = new Vec2(
        e.pageX,
        e.pageY
      ).subtract(canvasOffset);
    });

    canvas.addEventListener('touchstart', () => {
      // Canvas offset on page.
      canvasOffset.xy = [canvas.offsetLeft, canvas.offsetTop];
      window.addEventListener('touchmove', followTouch, { passive: false });
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
    );
  }
}

function followTouch(e) {
  e.preventDefault();

  // Take difference as canvas position for target,
  // as "offset" doesn't exist on touch events.
  chain.target = new Vec2(
    e.touches[0].pageX,
    e.touches[0].pageY
  ).subtract(canvasOffset);

  window.addEventListener('touchend', () => {
    window.removeEventListener('touchmove', followTouch);
  });
}
