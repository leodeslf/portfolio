import React, { Component } from 'react'

export default class Nav extends Component {
  constructor() {
    super();
    this.titles = undefined;
    this.titlesLinks = undefined;
  }

  componentDidMount() {
    this.titles = document.getElementsByTagName('h2');
    this.titlesLinks = document.querySelectorAll('.step a');
    // Set Table of Contents "active" item by scrolling
    window.addEventListener('scroll', () => {
      const SCROLL_TOP = document.documentElement.scrollTop;
      for (let i = 0; i < this.titles.length; i++) {
        if (this.titles[i].offsetTop - 48 <= SCROLL_TOP) {
          if (i < this.titles.length - 1 && this.titles[i + 1].offsetTop - 48 > SCROLL_TOP) {
            for (let j = 0; j < this.titles.length; j++) {
              if (j === i) {
                this.titlesLinks[j].classList.add('step--active');
              } else {
                this.titlesLinks[j].classList.remove('step--active');
              }
            }
          }
        }
        else if (this.titles[0].offsetTop - 48 > SCROLL_TOP) {
          this.titlesLinks[0].classList.remove('step--active');
        }
      }
    });
    // Set Table of Content "active" item by clicking
    this.titlesLinks.forEach(item => {
      item.addEventListener('click', () => {
        for (let j = 0; j < this.titles.length; j++) {
          this.titlesLinks[j].classList.remove('step--active');
        }
        item.classList.add('step--active');
      });
    });
  }

  render() {
    return (
      <nav className="stepper Portfolio__elem">
        <h4>Tabla de Contenido</h4>
        <ul>
          <li className="step"><a href="#about">Sobre mi</a></li>
          <li className="step"><a href="#tools">Herramientas</a></li>
          <li className="step"><a href="#projects">Proyectos</a></li>
          <li className="step"><a href="#cv">Curriculum Vitae</a></li>
          <li className="step"><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
    );
  }
}