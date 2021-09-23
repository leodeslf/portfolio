import "./vec.scss";

export default function Vec() {

  return (
    <a href="https://www.npmjs.com/package/@leodeslf/vec.js" className="preview--vec preview__body preview--live">
      <pre>
        {`      .             .
<------\\           /------>
  <-----\\.       ./----->
    <----\\\\     //---->
      <---\\\\. .//--->
        <--\\\\Y//-->
          <-\\|/->
             V`}
      </pre>
      <p className="vec__box-symbols">⮅☂</p>
      <p className="vec__npm-sticker">npm</p>
    </a>
  );
}

/* import { useEffect } from 'react';
import { side } from '../previewUtil';
import { initControl, reset } from './control'; */

/* useEffect(() => {
  initControl(
    document.getElementById('vec__canvas'),
    document.getElementById('vec__debug-canvas')
  );
}, []); */

/* <div className="preview--vec">
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
</div> */
