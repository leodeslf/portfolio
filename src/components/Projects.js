import React from 'react';
import PropTypes from 'prop-types';
import PROJECTS from '../json/projects.json';

export default function Projects() {
  return (
    <section id="projects" className="portfolio__projects portfolio__elem">
      <h2>Proyectos</h2>
      {PROJECTS.map((item, i) => (
        <ProjectItem key={i} i={i} {...item} />
      ))}
    </section>
  );
}

function ProjectItem({
  i, title, date, about, argument, old_stack, new_stack, src, web, repo
}) {
  return (
    <article className="portfolio__project">
      <h3 className="project__title"><a href={web || repo}>{title}</a></h3>
      <p className="project__desc">{`${about}.`}</p>
      <input
        id={`switch-${i}`}
        type="checkbox"
        className="more-switch__input"
        defaultChecked={false} />
      <label
        htmlFor={`switch-${i}`}
        className="more-switch__label" />
      <span className="project__date"><em>{date}</em></span>
      <div className="project__details">
        <p className="project__objective">
          <strong>Objetivo: </strong>{`${argument}.`}
        </p>
        {(old_stack || new_stack) &&
          <div className="project__stack">
            <strong>Stack: </strong>
            <ul>
              {old_stack && <OldStack old_stack={old_stack} i={i} />}
              {new_stack && <NewStack new_stack={new_stack} i={i} />}
            </ul>
          </div>
        }
        {src &&
          <div className="project__res">
            <strong>Recursos: </strong>
            <ResourceList src={src} i={i} />
          </div>
        }
        <p>
          <strong>Links: </strong>
          {web && <><a href={web}>Web</a>, </>}
          <a href={repo}>Repositorio</a>.
        </p>
      </div>
    </article>
  );
}

ProjectItem.propTypes = {
  i: PropTypes.number.isRequired,
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

function OldStack({ old_stack, i }) {
  return (
    <>
      {old_stack.map((item, index) => (
        <li
          className="stack__old-item"
          key={`${i}_${index}`}>
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
  i: PropTypes.number.isRequired
}

function NewStack({ new_stack, i }) {
  return (
    <>
      {new_stack.map((item, index) => (
        <li
          className="stack__new-item"
          key={`${i}_${index}`}>
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
  i: PropTypes.number.isRequired
}

function ResourceList({ src, i }) {
  return (
    <ul className="res__list">
      {src.map(({ name, link, linkName }, index) => (
        <li key={`${i}_${index}`}>
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
  i: PropTypes.number.isRequired
}
