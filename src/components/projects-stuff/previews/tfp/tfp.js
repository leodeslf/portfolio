import { useEffect } from 'react';
import { canvasH, canvasW } from '../preview-util/util';
import { initControl } from './control';

export default function TFP() {
  useEffect(() => {
    initControl(document.getElementById('tfp__canvas'));
  }, []);

  return (
    <div className="preview__main preview--tfp">
      <canvas
        className="preview__canvas preview__body"
        id="tfp__canvas"
        height={canvasH}
        width={canvasW} />
      <p className="preview__caption">Click para cambiar de modo.</p>
    </div>
  );
}
