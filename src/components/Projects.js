import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import PROJECTS from '../json/projects.json';

const SeeMore = lazy(() =>
  import( /* webpackChunkName: "seemore" */ './SeeMore'));

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
  i, title, date, about, argument, tech_stack, res, web, repo
}) {
  return (
    <article className="portfolio__project">
      <h3 className="project__title"><a href={web || repo}>{title}</a></h3>
      <p className="project__desc">{`${about}.`}</p>
      <Suspense fallback="">
        <SeeMore mod={i} children={
          <>
            <span className="project__date text--small"><em>{date}</em></span>
            <div className="project__details see-more__hidden-block">
              <p className="project__objective">
                <strong>Objetivo: </strong>{argument}.
              </p>
              <div className="project__stack">
                <strong>Stack: </strong>
                <ul>
                  <TechStack tech_stack={tech_stack} i={i} />
                </ul>
              </div>
              {res &&
                <div className="project__res">
                  <strong>Recursos: </strong>
                  <ResourceList res={res} i={i} />
                </div>
              }
              <p>
                <strong>Links: </strong>
                {web && <><a href={web}>Web</a>, </>}
                <a href={repo}>Repositorio</a>.
              </p>
            </div>
          </>
        } />
      </Suspense>
    </article>
  );
}

ProjectItem.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  argument: PropTypes.string.isRequired,
  tech_stack: PropTypes.arrayOf(
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

function TechStack({ tech_stack, i }) {
  const OLD_TECHS_LENGTH = tech_stack[0].length;
  return (
    <>
      {[...tech_stack[0], ...tech_stack[1]].map((item, index) => (
        <li
          className={
            `stack__${
            index >= OLD_TECHS_LENGTH ? 'new' : 'old'
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
  tech_stack: PropTypes.arrayOf(
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
