import React, { lazy, useState } from 'react';

const Menu = lazy(() =>
  import( /* webpackChunkName: "menu" */ './Menu.js'));
const StepperNav = lazy(() =>
  import( /* webpackChunkName: "steppernav" */ './StepperNav.js'));
const CopyRight = lazy(() =>
  import( /* webpackChunkName: "copyright" */ './CopyRight.js'));

const bigMedia = window.matchMedia('screen and (min-width: 640px)');

export default function Aside() {
  const [visible, setVisible] = useState(false);
  bigMedia.onchange = e => {
    if (e.matches) setVisible(false);
  }

  return (
    <>
      <button
        className="icon-label aside__button"
        onClick={() => setVisible(true)}
        aria-label="Mostrar menú">
        <span className="icon icon--24">
          <svg viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </span>
      </button>
      <aside className="aside" isvisible={visible.toString()}>
        <div className="aside__bg" onClick={() => setVisible(false)} />
        <div className="aside__sticky">
          <div className="sticky__slide">
            <Menu />
            <StepperNav />
            <CopyRight />
          </div>
        </div>
      </aside>
    </>
  );
}