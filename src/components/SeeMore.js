import React from 'react'

export default function SeeMore({ i, children }) {
  return (
    <>
      <input
        id={`see-more__input-${i}`}
        type="checkbox"
        className="see-more__input"
        defaultChecked={false} />
      <div className="see-more__container">
        <label
          htmlFor={`see-more__input-${i}`}
          className="see-more__label text--small" />
        {children}
      </div>
    </>
  );
}
