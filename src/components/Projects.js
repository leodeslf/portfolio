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

function ProjectItem({
  id, title, date, about, argument, old_stack, new_stack, src, web, repo
}) {
  return (
    <article className="project">
      <h3 className="project__title"><a href={web}>{title}</a></h3>
      <p className="project__desc">{`${about}.`}</p>
      <input
        id={`switch-${id}`}
        type="checkbox"
        className="switch__input"
        defaultChecked={false} />
      <label
        htmlFor={`switch-${id}`}
        className="switch__label" />
      <span className="project__date"><em>{date}</em></span>
      <div className="project__details">
        <p className="details__objective">
          <strong>Objetivo: </strong>{`${argument}.`}
        </p>
        {(old_stack || new_stack) &&
          <div className="details__stack">
            <strong>Stack: </strong>
            <ul>
              {old_stack && <OldStack old_stack={old_stack} top_key={id} />}
              {new_stack && <NewStack new_stack={new_stack} top_key={id} />}
            </ul>
          </div>
        }
        {src &&
          <div className="details__rsc">
            <strong>Recursos: </strong>
            <ResourceList src={src} top_key={id} />
          </div>
        }
        <p>
          <strong>Links: </strong>
          <a href={web}>Web</a>, <a href={repo}>Repositorio</a>.
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

function OldStack({ old_stack, top_key }) {
  return (
    <>
      {old_stack.map((item, i) => (
        <li
          className="stack__old-item"
          key={`${top_key}_${i}`}>
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

function NewStack({ new_stack, top_key }) {
  return (
    <>
      {new_stack.map((item, i) => (
        <li
          className="stack__new-item"
          key={`${top_key}_${i}`}>
          {item}<span>new</span>
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

function ResourceList({ src, top_key }) {
  return (
    <ul className="src-list">
      {src.map(({ name, link, linkName }, i) => (
        <li key={`${top_key}_${i}`}>
          {name} - <a href={link}>{linkName}</a>
        </li>
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
