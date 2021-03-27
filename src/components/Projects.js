import React, { Fragment, lazy, Suspense } from 'react';
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
  i, title, date, about, argument, tools, res, links, preview
}) {
  const { seeMoreInputProps, seeMoreLabelProps } = seeMore(i);
  const Preview = lazy(() => import(
    /* webpackChunkName: "preview" */
    `../previews/${preview}/${preview}.js`));

  return (
    <article className="portfolio__project text--small">
      <div className="project__preview preview">
        <Suspense fallback="">
          <Preview />
        </Suspense>
        <footer className="preview__footer">
          {tools.new.length > 0 &&
            <span className="preview__new-tools">
              <span className="new-tools__tag">Nuevo:</span>
              {tools.new.map((tool, i) =>
                <span key={i} className="new-tools__tool">
                  {(i > 0 ? ', ' : '') + tool}
                </span>)}.
            </span>}
          <span className="preview__date">
            {date.slice(3)}
          </span>
        </footer>
      </div>
      <header className="project__header">
        <h3 className="project__title">
          <a href={links[0].link} title={links[0].name}>
            {title}
            <span className="icon icon--21">
              <svg viewBox="0 0 21 21">
                <path d="M16.3,16.3H4.7V4.7h5.8V3H4.7C3.7,3,3,3.8,3,4.7v11.7
                C3,17.2,3.7,18,4.7,18h11.7c0.9,0,1.7-0.8,1.7-1.7v-5.8h-1.7
                V16.3zM12.2,3v1.7h3L7,12.9L8.1,14l8.2-8.2v3H18V3H12.2z" />
              </svg>
            </span>
          </a>
        </h3>
      </header>
      <p className="project__about">
        {about}.
      </p>
      <input {...seeMoreInputProps} />
      <label {...seeMoreLabelProps} title="Expandir / Colapsar.">
        <span className="icon icon--21">
          <svg viewBox="0 0 21 21">
            <path d="M10.5,6.5l-6,6l1.4,1.4l4.6-4.6l4.6,4.6l1.4-1.4L10.5,6.5z" />
          </svg>
        </span>
      </label>
      <div className="project__details see-more__hidden-block">
        <p>
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
                {i < links.length - 1 ? ', ' : ''}
              </Fragment>
            )}.
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
  ).isRequired,
  preview: PropTypes.string.isRequired
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
