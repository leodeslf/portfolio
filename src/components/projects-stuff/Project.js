import { lazy, Suspense } from 'react';
import PreviewFallback from './PreviewFallback';
import ShowHide from '../ShowHide';
import ProjectDetails from './ProjectDetails';

export default function Project(props) {
  const { title,/*  date, */ about, tools, links, preview } = props;
  const Preview = lazy(() => import(/* webpackChunkName: "preview" */
    `./previews/${preview}/${preview}.js`));

  return (
    <article className="portfolio__project text--small">
      <div className="project__preview preview">
        <Suspense fallback={<PreviewFallback message="Cargando..." />}>
          <Preview />
        </Suspense>
      </div>
      <header className="project__header">
        {tools.new.length > 0 &&
          <span className="project__new-tools text--extra-small">
            {tools.new.map((tool, i) =>
              <span key={i} className="new-tools__tool">
                {tool}
              </span>)}
          </span>}
        <h3 className="project__title">
          <a href={links[0].link} title={links[0].name}>
            {title}
          </a>
        </h3>
      </header>
      <p className="project__about">
        {about}.
      </p>
      <ShowHide
        id={preview}
        defaultChecked={false}
        content={<ProjectDetails {...props} />}
      />
    </article>
  );
}
