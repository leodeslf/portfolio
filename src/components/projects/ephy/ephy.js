import { useEffect } from 'react';
import { canvasSide } from '../previewUtil';
import { initControl, reset } from './control';
import './ephy.scss';

export default function Ephy() {
  useEffect(() => {
    initControl(document.getElementById('ephy'));
  }, []);

  return (
    <canvas
      className="preview__canvas preview__body preview__body--interactive"
      id="ephy"
      height={canvasSide}
      width={canvasSide}
      onClick={reset}
    />
  );
}
