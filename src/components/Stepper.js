import React, { Component } from 'react';

const MARGIN = window.screen.height * 0.2;
const anchors = [
  ['#tools', 'Herramientas'],
  ['#projects', 'Proyectos'],
  ['#cv', 'Currículum Vitae'],
  ['#contact', 'Contacto']
];

export default class Stepper extends Component {
  constructor() {
    super();
    this.anchorElems = undefined;
    this.titles = document.getElementsByTagName('h2');
    this.updateActiveStep = this.updateActiveStep.bind(this);
  }

  componentDidMount() {
    this.anchorElems = document.querySelectorAll('.step__anchor');
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
      for (let i = 0; i < this.titles.length; i++) {
        this.anchorElems[i].classList.remove('step__anchor--active');
      }
      return;
    }

    for (let i = 0; i < this.titles.length; i++) {
      // If it's on screen or above.
      if (this.titles[i].offsetTop - MARGIN <= SCROLL_TOP) {
        // If there are more titles below
        // but, the title below is too low:
        // then, [i] title is "active".
        if (i < this.titles.length - 1 &&
          this.titles[i + 1].offsetTop - MARGIN > SCROLL_TOP) {
          // For each titile: remove class 'step--active'
          // unles os the one we want.
          for (let j = 0; j < this.titles.length; j++) {
            if (j === i) {
              this.anchorElems[j].classList.add('step__anchor--active');
            } else {
              this.anchorElems[j].classList.remove('step__anchor--active');
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
          {anchors.map((item, i) => (
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
      <a className="step__anchor" href={to}>{content}</a>
    </li>
  );
}
