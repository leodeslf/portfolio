import { useEffect } from 'react'
import { initControl } from './control';
import "./ik.scss";


export default function IK() {
  useEffect(() => {
    initControl(document.getElementById('ik__canvas'));
  }, []);

  return (
    <div className="preview--ik">
      <canvas
        className="preview__canvas preview__body"
        id="ik__canvas"
        height="192"
        width="192"
      />
    </div>
  );
}
