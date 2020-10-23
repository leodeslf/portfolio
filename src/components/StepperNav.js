import React, { Component } from 'react';

const ANCHORS = [
  ['#start', 'Inicio'],
  ['#about', 'Sobre mí'],
  ['#tools', 'Herramientas'],
  ['#projects', 'Proyectos'],
  ['#cv', 'Currículum Vitae'],
  ['#contact', 'Contacto']
];

export default class StepperNav extends Component {
  render() {
    return (
      <nav className="stepper text--small">
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
