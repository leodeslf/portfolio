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
      <ShowHide
        id={preview}
        defaultChecked={false}
        content={<ProjectDetails {...props} />}
      />
    </article>
  );
}
