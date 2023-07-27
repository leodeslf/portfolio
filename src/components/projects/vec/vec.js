import "./vec.scss";

export default function Vec() {
  return (
    <a
      href="https://www.npmjs.com/package/@leodeslf/vec.js"
      className="preview__body preview__body--interactive"
      id="vec"
    >
      <pre>
        {`.             .
<------\\           /------>
<-----\\.       ./----->
<----\\\\     //---->
<---\\\\. .//--->
<--\\\\Y//-->
<-\\|/->
V`}
      </pre>
      <span className="vec__box-symbols">⮅☂</span>
      <span className="vec__npm-sticker">npm</span>
    </a>
  );
}
