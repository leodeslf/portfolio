import { Vec2 } from '../../../js/vec.min';
import { run, setContext, setTarget } from './animation';

let
  canvasOffset = new Vec2(),
  initialized = false;

function initControl(canvas) {
  setContext(canvas.getContext('2d'));
  if (!initialized) {
    initialized = true;
    run();
  }

  canvas.addEventListener('mousedown', mouse => {
    setTarget(mouse.offsetX, mouse.offsetY);
    window.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', mouseMove);
    });
    canvas.addEventListener('mousemove', mouseMove);
  });

  canvas.addEventListener('touchstart', touch => {
    touch.preventDefault();
    canvasOffset.xy = [canvas.offsetLeft, canvas.offsetTop];
    setTarget(
      touch.touches[0].pageX - canvasOffset.x,
      touch.touches[0].pageY - canvasOffset.y
    );
    window.addEventListener('touchend', () => {
      canvas.removeEventListener('touchmove', touchMove);
    });
    canvas.addEventListener('touchmove', touchMove, { passive: false });
  }, { passive: false });
}

function mouseMove(mouse) {
  setTarget(mouse.offsetX, mouse.offsetY);
}

function touchMove(touch) {
  setTarget(
    touch.changedTouches[0].pageX - canvasOffset.x,
    touch.changedTouches[0].pageY - canvasOffset.y
  );
}

export { initControl };
