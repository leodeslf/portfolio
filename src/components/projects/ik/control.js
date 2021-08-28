import { Vec2 } from '../../../js/vec.min';
import { run, setCtx, setTarget } from './animation';

// Canvas rendering context and cfg. vars.
let canvasOffset = new Vec2();
let initialized = false;

/**
 * Initialize process, define rendering context and start generating and
 * printing data.
 */
function initControl(canvas) {
  setCtx(canvas.getContext('2d'));
  if (!initialized) {
    initialized = true;
    run();
  }

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

function mouseMove(e) {
  setTarget(e.offsetX, e.offsetY);
}

function touchMove(e) {
  setTarget(
    e.changedTouches[0].pageX - canvasOffset.x,
    e.changedTouches[0].pageY - canvasOffset.y
  );
}

export { initControl };
