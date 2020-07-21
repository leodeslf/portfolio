import React, { Component } from 'react';
import { NavHashLink } from 'react-router-hash-link';

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

  componentDidUpdate() {
    this.updateActiveStep();
  }

  componentDidMount() {
    this.anchorElems = document.querySelectorAll('.step a');
    this.updateActiveStep();

    // Update active one by scrolling
    window.addEventListener('scroll', this.updateActiveStep);

    // Set active one by clicking
    this.anchorElems.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.add('step--active');
        for (let i = 0; i < this.titles.length; i++) {
          this.anchorElems[i].classList.remove('step--active');
        }
      });
    });
  }

  updateActiveStep() {
    const SCROLL_TOP = document.documentElement.scrollTop;

    // If the first anchor is too low, they all are too low.
    if (this.titles[0].offsetTop - MARGIN > SCROLL_TOP) {
      for (let i = 0; i < this.titles.length; i++) {
        this.anchorElems[i].classList.remove('step--active');
      }
      return;
    }

    for (let i = 0; i < this.titles.length; i++) {

      // If it's on screen or above.
      if (this.titles[i].offsetTop - MARGIN <= SCROLL_TOP) {

        // If there are more titles below
        // but, the title below is too low:
        // then, [i] title is on "focus".
        if (i < this.titles.length - 1 &&
          this.titles[i + 1].offsetTop - MARGIN > SCROLL_TOP) {

          // For each titile: remove class 'step--active'
          // unles os the one we want.
          for (let j = 0; j < this.titles.length; j++) {
            if (j === i) {
              this.anchorElems[j].classList.add('step--active');
            } else {
              this.anchorElems[j].classList.remove('step--active');
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <nav className="stepper Portfolio__elem">
        <h4>Contenido</h4>
        <ul>
          {anchors.map((item, i) => (
            <Step to={item[0]} content={item[1]} key={i} />
          ))}
        </ul>
      </nav>
    );
  }
}

function Step(props) {
  const { to, content } = props;
  return (
    <li className="step">
      <NavHashLink
        activeClassName='step--active'
        to={to}>
        {content}
      </NavHashLink>
    </li>
  );
}
