import { useEffect } from 'react';
import { side } from '../previewUtil';
import { delegateNoiseCtxTo, delegateSkinCtxTo } from './control';
import "./tfp.scss";

export default function TFP() {
  useEffect(() => {
    delegateNoiseCtxTo(
      document.getElementById('tfp__canvas').getContext('2d')
    );
    delegateSkinCtxTo(
      document.getElementById('tfp__skin-canvas').getContext('2d')
    );
  }, []);

  return (
    <div className="preview--tfp">
      <canvas
        className="preview__canvas preview__body preview--live"
        id="tfp__canvas"
        height={side}
        width={side}
      />
      <canvas id="tfp__skin-canvas" />
    </div>
  );
}
