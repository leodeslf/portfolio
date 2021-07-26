import { useEffect } from 'react';
import { canvasH, canvasW } from '../preview-util/util';
import PreviewCaption from '../PreviewCaption';
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
      <PreviewCaption text="Click para cambiar de modo" />
    </div>
  );
}
