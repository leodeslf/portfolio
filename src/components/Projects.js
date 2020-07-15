import React from 'react';
import PropTypes from 'prop-types';
import PROJECTS from '../json/projects.json';

export default function Projects() {
  return (
    <section id="projects" className="projects Portfolio__elem">
      <h2>Proyectos</h2>
      {PROJECTS.map((item, i) => (
        <ProjectItem key={i} {...item} />
      ))}
    </section>
  );
}

function ProjectItem(props) {
  return (
    <article className="projects__elem">
      <h3><a href={props.web}>{props.title}</a></h3>
      <p>{`${props.about}.`}</p>
      <input id={`chk-${props.id}`} type="checkbox" className="custom-chk__chk" defaultChecked={false} />
      <div className="chk_date">
        <label htmlFor={`chk-${props.id}`} className="custom-chk__lbl"></label>
        <span className="date"><em>{props.date}</em></span>
      </div>
      <div className="description">
        <p>
          <strong>Objetivo: </strong>{`${props.argument}.`}
        </p>
        {(props.old_stack || props.new_stack) &&
          <>
            <strong>Stack: </strong>
            <ul>
              {props.old_stack &&
                <OldStack old_stack={props.old_stack} top_key={props.id} />}
              {props.new_stack &&
                <NewStack new_stack={props.new_stack} top_key={props.id} />}
            </ul>
          </>
        }
        {props.src &&
          <>
            <strong>Recursos: </strong>
            <ResourceList src={props.src} top_key={props.id} />
          </>
        }
        <p>
          <strong>Links: </strong>
          <a href={props.web}>Web</a>
          , <a href={props.repo}>Repositorio</a>.
          </p>
      </div>
    </article>
  );
}

ProjectItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  argument: PropTypes.string.isRequired,
  old_stack: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
  new_stack: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
  src: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
  })),
  web: PropTypes.string,
  repo: PropTypes.string
}

function OldStack(props) {
  return (
    <>
      {props.old_stack.map((item, i) => (
        <li className="old-stack-item" key={`${props.top_key}_${i}`}>
          {`${item}`}
        </li>
      ))}
    </>
  );
}

OldStack.propTypes = {
  old_stack: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  top_key: PropTypes.number.isRequired
}

function NewStack(props) {
  return (
    <>
      {props.new_stack.map((item, i) => (
        <li className="new-stack-item" key={`${props.top_key}_${i}`}>
          {`${item}`}
        </li>
      ))}
    </>
  );
}

NewStack.propTypes = {
  new_stack: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  top_key: PropTypes.number.isRequired
}

function ResourceList(props) {
  return (
    <ul className="src-list">
      {props.src.map((item, i) => (
        <li key={`${props.top_key}_${i}`}>{item.name} - <a href={item.link}>
          {item.linkName}
        </a></li>
      ))}
    </ul>
  );
}

ResourceList.prototypes = {
  src: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
  })),
  top_key: PropTypes.number.isRequired
}
