import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PROJECTS from '../json/projects.json';
import seeMore from '../js/seeMore';

export default function Projects() {
  return (
    <section id="projects" className="portfolio__projects portfolio__elem">
      <h2>Proyectos</h2>
      <div className="projects__container">
        {PROJECTS.map((item, i) => (
          <ProjectItem key={i} i={i} {...item} />
        ))}
      </div>
    </section>
  );
}

function ProjectItem({
  i, title, date, about, argument, tools, res, links
}) {
  const { input, label } = seeMore(i);
  return (
    <article className="portfolio__project text--small">
      <header className="project__header">
        <h3 className="project__title">
          <a href={links[0].link} title={links[0].name}>{title}</a>
        </h3>
        {tools.new.length > 0 &&
          <span
            className="project__new-tools"
            title={
              tools.new.length > 1 ?
                "Nuevas herramientas." :
                "Nueva herramienta."
            }>
            <span className="new-tools__new-tag">+</span>
            {tools.new.map((tool, i) =>
              <span key={i} className="new-tools__tool">
                {`${tool}`}
              </span>)}
          </span>}
      </header>
      <p className="project__about">
        {about}.
      </p>
      <input {...input} />
      <label {...label}>
        <span className="icon icon--21">
          <svg viewBox="0 0 21 21">
            <path d="M10.5,6.5l-6,6l1.4,1.4l4.6-4.6l4.6,4.6l1.4-1.4L10.5,6.5z" />
          </svg>
        </span>
      </label>
      <div className="project__details see-more__hidden-block">
        <p className="project__objective">
          <strong>Objetivo</strong><br />
          {argument}.
        </p>
        <div className="project__tools ul-container">
          <strong>Herramientas</strong>
          <ul>
            {[...tools.old, ...tools.new].map((item, index) => (
              <li key={`${i}_${index}`}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {res &&
          <div className="project__res ul-container">
            <strong>Recursos</strong>
            <ResourceList res={res} i={i} />
          </div>}
        <footer>
          <span>
            {links.map(({ name, link }, i) =>
              <Fragment key={i}>
                <a href={link}>
                  {name}
                </a>
                {i < links.length - 1 ? ' - ' : ''}
              </Fragment>
            )}
          </span>
          <span>
            {date}
          </span>
        </footer>
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
  tools:
    PropTypes.shape({
      old: PropTypes.arrayOf(PropTypes.string),
      new: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
  res: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      linkName: PropTypes.string.isRequired,
    })),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

function ResourceList({ res, i }) {
  return (
    <ul className="res__list">
      {res.map(({ name, link, linkName }, index) => (
        <li key={`${i}_${index}`}>
          {name} - <a href={link}>{linkName}</a>
        </li>
      ))}
    </ul>
  );
}

ResourceList.prototypes = {
  res: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
  })),
  i: PropTypes.number.isRequired
}
