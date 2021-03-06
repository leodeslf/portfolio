import { useState } from 'react';
import Settings from './Settings';
import Navigation from './Navigation';
import Footer from './Footer';

const bigMedia = window.matchMedia('screen and (min-width: 640px)');

export default function Aside() {
  const [visible, setVisible] = useState(false);
  bigMedia.onchange = e => {
    if (e.matches) setVisible(false);
  }

  return (
    <>
      <button
        className="icon__label aside__button"
        onClick={() => setVisible(true)}
        aria-label="Mostrar menú."
        aria-controls="Menú"
        aria-expanded={visible + ""}>
        <span className="icon icon--24">
          <svg viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </span>
      </button>
      <aside
        className="aside"
        isvisible={visible + ""}>
        <div
          className="aside__close"
          onClick={() => setVisible(false)}
          role="button"
          aria-label="Ocultar menú."
          aria-controls="Menú"
          aria-expanded={visible + ""} />
        <div className="aside__sticky">
          <div className="sticky__slide">
            <Settings />
            <Navigation />
            <Footer />
          </div>
        </div>
      </aside>
    </>
  );
}
