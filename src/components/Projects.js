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
    <article className={`portfolio__project text--small`}>
      <h3 className="project__title">
        <a href={links[0][1]} title={links[0][0]}>{title}</a>
      </h3>
      <input {...input} />
      <label {...label}>
        <svg viewBox="0 0 24 24">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
      </label>
      <div className="project__details see-more__hidden-block">
        <p className="project__type-and-date">{links[0][0]} - {date}</p>
        <p className="project__about">
          Acerca de: {`${about}.`}
        </p>
        <p className="project__objective">
          Objetivo: {argument}.
        </p>
        <div className="project__tools ul-container">
          Herramientas:
          <ul>
            <TechStack tools={tools} i={i} />
          </ul>
        </div>
        {res &&
          <div className="project__res ul-container">
            Recursos:
            <ResourceList res={res} i={i} />
          </div>
        }
        <p>
          Links: {links.map((link, i) =>
          <Fragment key={i}>
            <a href={link[1]}>{link[0]}</a>
            {i < links.length - 1 ? ', ' : ''}
          </Fragment>
        )}.
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
  tools: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string
    ).isRequired
  ).isRequired,
  res: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
  })),
  web: PropTypes.string,
  repo: PropTypes.string
}

function TechStack({ tools, i }) {
  const OLD_TECHS_LENGTH = tools[0].length;
  return (
    <>
      {[...tools[0], ...tools[1]].map((item, index) => (
        <li
          className={
            `stack__${index >= OLD_TECHS_LENGTH ? 'new' : 'old'
            }-item`
          }
          key={`${i}_${index}`}>
          {item}{(index >= OLD_TECHS_LENGTH) && <span>new</span>}
        </li>
      ))}
    </>
  );
}

TechStack.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string
    ).isRequired
  ).isRequired,
  i: PropTypes.number.isRequired
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
