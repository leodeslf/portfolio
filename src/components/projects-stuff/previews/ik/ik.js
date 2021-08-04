import { useEffect } from 'react'
import { Vec2 } from '../../../../js/vec.min';
import { canvasH, canvasW } from '../preview-util/util';
import { initControl, setTarget } from './control'
import PreviewCaption from '../PreviewCaption';

// Canvas offset on page.
let canvasOffset = new Vec2();

export default function IK() {
  useEffect(() => {
    let canvas = document.getElementById('ik__canvas');
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
  }, []);

  return (
    <div className="preview__main preview--ik">
      <canvas
        className="preview__canvas preview__body"
        id="ik__canvas"
        height={canvasH}
        width={canvasW} />
      <PreviewCaption text="Click para mover el objetivo" />
    </div>
  );
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
