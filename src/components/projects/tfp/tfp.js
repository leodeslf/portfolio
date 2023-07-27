import { useEffect } from 'react';
import { canvasSide } from '../previewUtil';
import { delegateNoiseContextTo, delegateSkinContextTo } from './control';
import "./tfp.scss";

export default function TFP() {
  useEffect(() => {
    delegateNoiseContextTo(
      document.getElementById('tfp').getContext('2d')
    );
    delegateSkinContextTo(
      document.getElementById('tfp--skin').getContext('2d')
    );
  }, []);

  return (
    <>
      <canvas
        className="preview__canvas preview__body preview__body--interactive"
        id="tfp"
        height={canvasSide}
        width={canvasSide}
      />
      <canvas id="tfp--skin" />
    </>
  );
}
