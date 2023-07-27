import { useEffect } from 'react';
import { Vec2 } from '../../../js/vec.min';
import { canvasSide } from '../previewUtil';
import {
  delegateNoiseContextTo,
  delegateSkinContextTo,
  traslation
} from './control';
import "./tfp2.scss";

const touchAt = new Vec2();
const touchTo = new Vec2();

export default function TFP2() {
  useEffect(() => {
    let canvas = document.getElementById('tfp2');

    delegateNoiseContextTo(
      canvas.getContext('2d')
    );
    delegateSkinContextTo(
      document.getElementById('tfp2--skin').getContext('2d')
    );

    canvas.addEventListener('mousedown', () => {
      window.addEventListener('mousemove', drag);
    });

    canvas.addEventListener('touchstart', touch => {
      // Set movement "start" position.
      touchAt.xy = [touch.touches[0].pageX, touch.touches[0].pageY];
      window.addEventListener('touchmove', drag, { passive: false });
    }, { passive: false });
  }, []);

  return (
    <>
      <canvas
        className="preview__canvas preview__body preview__body--interactive"
        id="tfp2"
        height={canvasSide}
        width={canvasSide}
      />
      <canvas id="tfp2--skin" />
    </>
  );
}

function drag(event) {
  // Take movement deltas.
  const gap = new Vec2();

  switch (event.type) {
    case 'mousemove':
      gap.xy = [event.movementX, event.movementY];
      // Stop listener.
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', drag);
      });
      break;
    case 'touchmove':
      event.preventDefault();
      // Set movement "end" position.
      touchTo.xy = [event.touches[0].pageX, event.touches[0].pageY];
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
  traslation.subtract(gap);
}
