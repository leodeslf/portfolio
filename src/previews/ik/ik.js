import React, { Component } from 'react'
import { Vec2 } from '../../js/vec.min';
import { initControl, setTarget } from './control'

// Canvas offset on page.
let canvas;
let canvasOffset = new Vec2();

export default class ik extends Component {
  componentDidMount() {
    canvas = document.getElementById('ik__canvas');
    initControl(canvas.getContext('2d'));

    canvas.addEventListener('mousedown', m => {
      setTarget(m.offsetX, m.offsetY);
      window.addEventListener('mouseup', () => {
        canvas.removeEventListener('mousemove', mouseMove);
      });
      canvas.addEventListener('mousemove', mouseMove);
    });

    canvas.addEventListener('touchstart', t => {
      t.preventDefault();
      canvasOffset.xy = [canvas.offsetLeft, canvas.offsetTop];
      setTarget(
        t.touches[0].pageX - canvasOffset.x,
        t.touches[0].pageY - canvasOffset.y
      );
      window.addEventListener('touchend', () => {
        canvas.removeEventListener('touchmove', touchMove);
      });
      canvas.addEventListener('touchmove', touchMove, { passive: false });
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
        <p className="content__caption">Click para definir objetivo.</p>
      </div>
    );
  }
}

function mouseMove(e) {
  setTarget(e.offsetX, e.offsetY);
}

function touchMove(e) {
  setTarget(
    e.changedTouches[0].pageX - canvasOffset.x,
    e.changedTouches[0].pageY - canvasOffset.y
  );
}
