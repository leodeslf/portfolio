import { useEffect } from 'react';
import { initControl, reset } from './control';

export default function Vec() {
  useEffect(() => {
    initControl(
      document.getElementById('vec__canvas'),
      document.getElementById('vec__debug-canvas')
    );
  }, []);

  return (
    <div className="preview--vec">
      <canvas
        className="preview__body"
        id="vec__canvas"
        height="192"
        width="192"
        onClick={reset}
      />
      <canvas
        id="vec__debug-canvas"
        height="192"
        width="192"
      />
    </div>
  );
}
