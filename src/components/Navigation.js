import { useEffect } from 'react';
import sections from '../json/sections.json';
import initNavigationIO from '../js/navigationIO';

export default function Navigation() {
  useEffect(() => {
    initNavigationIO();
  }, []);

  return (
    <nav className="stepper-nav text--small">
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
