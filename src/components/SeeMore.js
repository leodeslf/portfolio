import React from 'react'

export default function SeeMore({ mod, children }) {
  return (
    <>
      <input
        id={`see-more__input--${mod}`}
        type="checkbox"
        className="see-more__input"
        defaultChecked={false} />
      <div className="see-more__container">
        <label
          htmlFor={`see-more__input--${mod}`}
          className="see-more__label text--small" />
        {children}
      </div>
    </>
  );
}
