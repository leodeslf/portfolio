import { useEffect } from 'react'
import { canvasSide } from '../previewUtil';
import { initControl } from './control';
import "./ik.scss";

export default function IK() {
  useEffect(() => {
    initControl(document.getElementById('ik'));
  }, []);

  return (
    <canvas
      className="preview__canvas preview__body preview__body--interactive"
      id="ik"
      height={canvasSide}
      width={canvasSide}
    />
  );
}
