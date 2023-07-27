import { useState } from 'react';
import Settings from './features/Settings';
import Navigation from './Navigation';
import Footer from './Footer';

const min630vw = window.matchMedia('screen and (min-width: 630px)');

export default function Aside() {
  const [visible, setVisible] = useState(min630vw.matches);
  min630vw.onchange = e => setVisible(e.matches ? true : false);

  return (
    <>
      <button
        className="aside__open-btn icon__label"
        onClick={() => setVisible(true)}
        aria-label="Mostrar menú."
        aria-controls="Menú"
        aria-expanded={visible + ""}
      >
        <span className="aside__open-btn-lines icon"></span>
      </button>
      <aside
        id="Menú"
        className={`aside${visible ? ' visible' : ''}`}
      >
        <button
          className="aside__close-btn"
          onClick={() => setVisible(false)}
          aria-label="Ocultar menú."
          aria-controls="Menú"
          aria-expanded={visible + ""}
        ></button>
        <div className="aside__sticky">
          <div className="aside__slide">
            <Settings />
            <Navigation />
            <Footer />
          </div>
        </div>
      </aside>
    </>
  );
}
