import React from 'react';

export default function Navigation() {
  const ANCHORS = [
    ['start', 'Inicio'],
    ['about', 'Sobre mí'],
    ['tools', 'Herramientas'],
    ['projects', 'Proyectos'],
    ['cv', 'Currículum Vitae'],
    ['connect', 'Conectar']
  ];

  return (
    <nav className="stepper-nav text--small">
      <ul className="stepper-nav__list">
        {ANCHORS.map((anchor, i) => (
          <li key={i}>
            <a
              className="step"
              href={'#' + anchor[0]}
              onClick={() => window.location.replace('#' + anchor[0])}>
              {anchor[1]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
