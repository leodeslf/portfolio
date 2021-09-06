import { useEffect } from 'react'
import { side } from '../previewUtil';
import { initControl } from './control';
import "./ik.scss";

export default function IK() {
  useEffect(() => {
    initControl(document.getElementById('ik__canvas'));
  }, []);

  return (
    <div className="preview--ik">
      <canvas
        className="preview__canvas preview__body preview--live"
        id="ik__canvas"
        height={side}
        width={side}
      />
    </div>
  );
}
