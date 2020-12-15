import React, { Component } from 'react';

const ANCHORS = [
  ['#start', 'Inicio'],
  ['#about', 'Sobre mí'],
  ['#tools', 'Herramientas'],
  ['#projects', 'Proyectos'],
  ['#cv', 'Currículum Vitae']
];

export default class StepperNav extends Component {
  render() {
    return (
      <nav className="stepper text--small">
        <ul className="stepper__list">
          {ANCHORS.map((item, i) => (
            <li className="stepper__item" key={i}>
              <a className="step" href={item[0]}>{item[1]}</a>
            </li>
          ))}
          <li className="stepper__item">
            <a className="cta"
              href='#contact'>
              Conectemos
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
