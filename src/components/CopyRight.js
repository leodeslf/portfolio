import React from 'react';

const URL = "/icons/favicon-16x16.png";

export default function CopyRight() {
  return (
    <footer className="copy-right">
      <p>
        <span className="logo">
          <img className="logo__icon"
            src={URL}
            alt="leodeslf logo"
            width="16px"
            height="16px" />
          <span className="logo__text">
            leodeslf © 2020
          </span>
        </span>
      </p>
    </footer>
  );
}