import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PROJECTS from '../json/projects.json';
import seeMore from '../js/seeMore';

/* const REPO =
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-24">
    <path fillRule="evenodd" d="M3 2.75A2.75 2.75 0 015.75 0h14.5a.75.75 0 01.75.75v20.5a.75.75 0 01-.75.75h-6a.75.75 0 010-1.5h5.25v-4H6A1.5 1.5 0 004.5 18v.75c0 .716.43 1.334 1.05 1.605a.75.75 0 01-.6 1.374A3.25 3.25 0 013 18.75v-16zM19.5 1.5V15H6c-.546 0-1.059.146-1.5.401V2.75c0-.69.56-1.25 1.25-1.25H19.5z"></path>
    <path d="M7 18.25a.25.25 0 01.25-.25h5a.25.25 0 01.25.25v5.01a.25.25 0 01-.397.201l-2.206-1.604a.25.25 0 00-.294 0L7.397 23.46a.25.25 0 01-.397-.2v-5.01z"></path>
  </svg>;
const PACK =
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-24">
    <path fillRule="evenodd" d="M12.876.64a1.75 1.75 0 00-1.75 0l-8.25 4.762a1.75 1.75 0 00-.875 1.515v9.525c0 .625.334 1.203.875 1.515l8.25 4.763a1.75 1.75 0 001.75 0l8.25-4.762a1.75 1.75 0 00.875-1.516V6.917a1.75 1.75 0 00-.875-1.515L12.876.639zm-1 1.298a.25.25 0 01.25 0l7.625 4.402-7.75 4.474-7.75-4.474 7.625-4.402zM3.501 7.64v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947L3.501 7.64zm9.25 13.421l7.625-4.402a.25.25 0 00.125-.216V7.639l-7.75 4.474v8.947z"></path>
  </svg>; */

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
      <p className="project__about">
        {about}.
      </p>
      <input {...input} />
      <label {...label}>
        <svg viewBox="0 0 24 24" className="svg-24">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
        </svg>
      </label>
      <div className="project__details see-more__hidden-block">
        <p className="project__objective">
          <strong>Objetivo</strong><br />
          {argument}.
        </p>
        <div className="project__tools ul-container">
          <strong>Herramientas</strong>
          <ul>
            <TechStack tools={tools} i={i} />
          </ul>
        </div>
        {res &&
          <div className="project__res ul-container">
            <strong>Recursos</strong>
            <ResourceList res={res} i={i} />
          </div>
        }
        <footer>
          <span>
            {links.map((link, i) =>
              <Fragment key={i}>
                <a href={link[1]}>{link[0]}</a>
                {i < links.length - 1 ? ', ' : ''}
              </Fragment>
            )}.
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
  links: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired
  ).isRequired
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
