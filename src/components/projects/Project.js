import { lazy, Suspense } from 'react';
import PreviewFallback from './PreviewFallback';
import ShowHide from '../features/ShowHide';
import ProjectDetails from './ProjectDetails';

export default function Project(props) {
  const { title, about, links, previewName } = props;
  const Preview = lazy(() => import(/* webpackChunkName: "previewName" */
    `./${previewName}/${previewName}.js`));

  return (
    <article className="projects__project">
      <div className="preview">
        <Suspense fallback={<PreviewFallback message="Cargando..." />}>
          <Preview />
        </Suspense>
      </div>
      <header className="project__header">
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
        id={previewName}
        defaultChecked={false}
        content={<ProjectDetails {...props} />}
      />
    </article>
  );
}
