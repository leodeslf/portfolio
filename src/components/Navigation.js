import React from 'react';

export default function Navigation() {
  const ANCHORS = [
    ['#start', 'Inicio'],
    ['#about', 'Sobre mí'],
    ['#tools', 'Herramientas'],
    ['#projects', 'Proyectos'],
    ['#cv', 'Currículum Vitae'],
    ['#connect', 'Conectar']
  ];

  return (
    <nav className="stepper-nav text--small">
      <ul className="stepper-nav__list">
        {ANCHORS.map((item, i) => (
          <li key={i}>
            <a
              className="step"
              href={item[0]}
              onClick={() => window.location.replace(item[0])}>
              {item[1]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
