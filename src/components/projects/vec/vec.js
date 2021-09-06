import { useEffect } from 'react';
import { side } from '../previewUtil';
import { initControl, reset } from './control';
import "./vec.scss";

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
        className="preview__canvas preview__body preview--live"
        id="vec__canvas"
        height={side}
        width={side}
        onClick={reset}
      />
      <canvas
        id="vec__debug-canvas"
        className="preview__canvas"
        height={side}
        width={side}
      />
    </div>
  );
}
