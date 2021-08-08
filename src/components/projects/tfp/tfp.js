import { useEffect } from 'react';
import { initControl } from './control';

export default function TFP() {
  useEffect(() => {
    initControl(document.getElementById('tfp__canvas'));
  }, []);

  return (
    <div className="preview--tfp">
      <canvas
        className="preview__canvas preview__body"
        id="tfp__canvas"
        height="192"
        width="192"
      />
    </div>
  );
}
