import { useEffect } from 'react';
import sections from '../json/sections.json';
import initNavigationFeedback from '../js/navigationFeedback';

export default function Navigation() {
  useEffect(() => {
    initNavigationFeedback();
  }, []);

  return (
    <nav className="stepper-nav">
      <ul className="stepper-nav__list">
        {sections.map(({ fragment, label }, i) =>
          <li key={i}>
            <a
              id={`step-for--${fragment}`}
              className="step"
              href={'#' + fragment}
              onClick={() => window.location.replace('#' + fragment)}
            >
              {label}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
