import React, { useEffect } from 'react';
import { initControl, reset } from './control';

export default function Vec() {
  useEffect(() => {
    initControl(
      document.getElementById('vec__canvas'),
      document.getElementById('vec__debug-canvas')
    );
  }, []);

  return (
    <div className="preview__main preview--vec">
      <canvas
        className="preview__body"
        id="vec__canvas"
        height="200"
        width="200"
        onClick={reset} />
      <canvas
        id="vec__debug-canvas"
        height="200"
        width="200" />
      <p className="preview__caption">Click para iniciar nuevo patrón.</p>
    </div>
  );
}
