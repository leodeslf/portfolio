import React, { Component } from 'react'
import PropTypes from 'prop-types';
import TOOLS from './tools.json';
import PROJECTS from './projects.json';

export default class Portfolio extends Component {
  constructor() {
    super();
    this.titles = undefined;
    this.titlesLinks = undefined;
    this.titlesCount = undefined;
  }

  componentDidMount() {
    this.titles = document.getElementsByTagName('h2');
    this.titlesLinks = document.querySelectorAll('.step a');
    this.titlesCount = this.titles.length;
    // Set Table of Contents "active" item by scrolling
    window.addEventListener('scroll', () => {
      const SCROLL_TOP = document.documentElement.scrollTop;
      for (let i = 0; i < this.titlesCount; i++)
        if ((this.titles[i].offsetTop - 48 <= SCROLL_TOP)
          && this.titles[i + 1].offsetTop - 48 > SCROLL_TOP)
          for (let j = 0; j < this.titlesCount; j++)
            if (j === i) this.titlesLinks[j].classList.add('step--active');
            else this.titlesLinks[j].classList.remove('step--active');
        else if (this.titles[0].offsetTop - 48 > SCROLL_TOP)
          this.titlesLinks[0].classList.remove('step--active');
    });
    // Set Table of Content "active" item by clicking
    this.titlesLinks.forEach(item => {
      item.addEventListener('click', () => {
        for (let j = 0; j < this.titlesCount; j++)
          this.titlesLinks[j].classList.remove('step--active');
        item.classList.add('step--active');
      });
    });
  }

  render() {
    return (
      <>
        <section className="Portfolio">
          <h1>Leonardo de S.L.F</h1>
          <section id="about" className="about Portfolio__elem">
            <h2>Sobre mi</h2>
            <p className="about__elem">
              Autodidacta (futuro) front-end developer, descubriendo, paso a
              paso, la manera en que <strong>creamos información y
              experiencias</strong> mediante la web.
            </p>
            <p className="about__elem">
              Desde Mayo de 2018 me he dedicado a conocer herramientas que
              puedan <strong>favorecer al usuario final y companeros de equipo</strong>.
            </p>
          </section>
          <section id="tool" className="tool Portfolio__elem">
            <h2>Herramientas</h2>
            {TOOLS.map(item => (
              <ToolGroup
                key={item.id}
                title={item.title}
                tools={item.tools} />
            ))}
          </section>
          <section id="project" className="project Portfolio__elem">
            <h2>Proyectos</h2>
            {PROJECTS.map(item => (
              <Project
                key={item.id}
                data={item} />
            ))}
          </section>
          <section id="curriculum" className="curriculum Portfolio__elem">
            <h2>Curriculum Vitae</h2>
            <p>
              Ver y descargar <a href="./Leonardo-de-Souza-Leal-Figueira-CV.pdf">aqui</a>.
            </p>
          </section>
          <section id="contact" className="contact Portfolio__elem">
            <h2>Contacto</h2>
            <p>
              leodeslf@gmail.com<br />
              099 705 972<br />
              <a href="https://www.linkedin.com/in/leonardo-de-souza-leal-figueira-8570b18a/">LinkedIn</a><br />
              <a href="https://github.com/Wikarot">GitHub</a><br />
              <a href="https://dribbble.com/Wikarot">Dribbble</a>
            </p>
          </section>
        </section>
        <Stepper />
      </>
    )
  }
}

function Stepper() {
  return (
    <nav className="stepper">
      <div className="stepper__elem Portfolio__elem">
        <h4>Tabla de Contenido</h4>
        <ul>
          <li className="step"><a href="#about">Sobre mi</a></li>
          <li className="step"><a href="#tool">Herramientas</a></li>
          <li className="step"><a href="#project">Proyectos</a></li>
          <li className="step"><a href="#curriculum">Curriculum</a></li>
          <li className="step"><a href="#contact">Contacto</a></li>
        </ul>
      </div>
    </nav>
  )
}

function ToolGroup(props) {
  return (
    <article className="tool__elem">
      <h3>{props.title}</h3>
      <ToolGroupItems tools={props.tools} />
    </article>
  )
}

ToolGroup.propTypes = {
  title: PropTypes.string.isRequired,
  tools: PropTypes.arrayOf(PropTypes.string).isRequired,
}

function ToolGroupItems(props) {
  return (
    <ul>
      {props.tools.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

ToolGroupItems.propTypes = {
  tools: PropTypes.arrayOf(PropTypes.string).isRequired
}

function Project(props) {
  return (
    <article className="project__elem">
      <h3>{props.data.title}</h3><em>{props.data.date}</em>
      <p>{`${props.data.about}.`}</p>
      <input id={`chk_${props.data.id}`} type="checkbox" className="custom-chk__chk" />
      <label htmlFor={`chk_${props.data.id}`} className="custom-chk__lbl"></label>
      <div className="description">
        <p>
          <em>Objetivo: </em>{`${props.data.argument}.`}
        </p>
        {(props.data.old_stack || props.data.new_stack) &&
          <>
            <em>Stack: </em>
            <ul>
              {props.data.old_stack &&
                <OldStackItems old_stack={props.data.old_stack} />}
              {props.data.new_stack &&
                <NewStackItems new_stack={props.data.new_stack} />}
            </ul>
          </>
        }
        {props.data.src &&
          <>
            <em>Recursos: </em>
            <Src src={props.data.src} />
          </>
        }
        {props.data.web &&
          <p>
            <em>Links: </em>
            <a href={props.data.web}>Web</a>
            {props.data.repo &&
              <span>, <a href={props.data.repo}>Repositorio</a></span>}.
          </p>
        }
      </div>
    </article>
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    argument: PropTypes.string.isRequired,
    old_stack: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    new_stack: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    src: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      linkName: PropTypes.string.isRequired,
    })),
    web: PropTypes.string,
    repo: PropTypes.string,
  })
}

function OldStackItems(props) {
  return (
    <>
      {props.old_stack.map(item => (
        <li className="old-stack-item" key={item.id}>
          {`${item.name}`}
        </li>
      ))}
    </>
  )
}

OldStackItems.propTypes = {
  old_stack: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
}

function NewStackItems(props) {
  return (
    <>
      {props.new_stack.map(item => (
        <li className="new-stack-item" title="Nuevo" key={item.id}>
          {`${item.name}`}
        </li>
      ))}
    </>
  )
}

NewStackItems.propTypes = {
  new_stack: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
}

function Src(props) {
  return (
    <ul className="src-list">
      {props.src.map(item => (
        <li key={item.id}>{item.name} - <a href={item.link}>{item.linkName}</a></li>
      ))}
    </ul>
  )
}

Src.prototypes = {
  src: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
  })),
}

/* {
  "id": 1,
  "title": "Familiarizado",
  "tools": [
    "Java",
    "VisualBasic.NET",
    "SQL",
    "MySQL",
    "Linux Bash"
  ]
}, */
