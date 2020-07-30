import React, { Component } from 'react';

const MARGIN = window.screen.height * 0.2;
const ANCHORS = [
  ['#tools', 'Herramientas'],
  ['#projects', 'Proyectos'],
  ['#cv', 'Currículum Vitae'],
  ['#contact', 'Contacto']
];
const A_LENGTH = ANCHORS.length;

export default class StepperNav extends Component {
  constructor() {
    super();
    this.titles = document.getElementsByTagName('h2');
    this.updateActiveStep = this.updateActiveStep.bind(this);
  }

  componentDidMount() {
    this.anchorElems = document.querySelectorAll('.stepper__anchor');
    this.updateActiveStep();

    // Set active one by clicking
    this.anchorElems.forEach(item => {
      item.addEventListener('click', () => {
        // Check by scroll values
        this.updateActiveStep();
      });
    });

    // Update active one by scrolling
    window.addEventListener('scroll', this.updateActiveStep);
  }

  updateActiveStep() {
    const SCROLL_TOP = document.documentElement.scrollTop;

    // If the first anchor is too low, they all are too low.
    if (this.titles[0].offsetTop - MARGIN > SCROLL_TOP) {
      for (let i = 0; i < A_LENGTH; i++) {
        this.anchorElems[i].classList.remove('stepper__anchor--active');
      }
      return;
    }

    for (let i = 0; i < A_LENGTH; i++) {

      // If it's on screen or above.
      if (this.titles[i].offsetTop - MARGIN <= SCROLL_TOP) {

        // If there are more below, but they are too low: then, it's the one.
        if (
          (i < A_LENGTH - 1) &&
          this.titles[i + 1].offsetTop - MARGIN > SCROLL_TOP) {

          // Remove "active" for each one unles os the one we want.
          for (let j = 0; j < A_LENGTH; j++) {
            if (j === i) {
              this.anchorElems[j].classList.add('stepper__anchor--active');
            } else {
              this.anchorElems[j].classList.remove('stepper__anchor--active');
            }
          }
        }
      }
    }
  }

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
    <li className="stepper__step">
      <a className="stepper__anchor" href={to}>{content}</a>
    </li>
  );
}
