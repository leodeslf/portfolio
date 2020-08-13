import React, { Component } from 'react';

const ANCHORS = [
  ['#tools', 'Herramientas'],
  ['#projects', 'Proyectos'],
  ['#cv', 'Currículum Vitae'],
  ['#contact', 'Contacto']
];

export default class StepperNav extends Component {

  render() {
    return (
      <nav className="stepper text--small">
        <strong className="stepper__caption">Contenido</strong>
        <ul className="stepper__list">
          {ANCHORS.map((item, i) => (
            <Step to={item[0]} content={item[1]} key={i} />
          ))}
        </ul>
      </nav>
    );
  }
}

function Step({ to, content }) {
  return (
    <li className="stepper__item">
      <a className="step" href={to}>{content}</a>
    </li>
  );
}
