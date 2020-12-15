import React, { lazy, Suspense } from 'react';

const ROOT = './components/';

const About = lazy(() =>
  import( /* webpackChunkName: "about" */ `${ROOT}About.js`));
const Tools = lazy(() =>
  import( /* webpackChunkName: "tools" */ `${ROOT}Tools.js`));
const Projects = lazy(() =>
  import( /* webpackChunkName: "projects" */ `${ROOT}Projects.js`));
const Cv = lazy(() =>
  import( /* webpackChunkName: "cv" */ `${ROOT}Cv.js`));
const Connect = lazy(() =>
  import( /* webpackChunkName: "connect" */ `${ROOT}Connect.js`));
const Aside = lazy(() =>
  import( /* webpackChunkName: "aside" */ `${ROOT}Aside.js`));

export default function Portfolio() {
  return (
    <Suspense fallback="">
      <main className="portfolio">
        <section id="start" className="portfolio__start portfolio__elem">
          <h1 title="Leonardo de Souza Leal Figueira">
            Leonardo de S. Leal Figueira
          </h1>
          <p>
            Aprendiendo <strong>Frontend</strong> como autodidacta,<br />
            con <strong>React</strong> y <strong>SASS</strong> en mi caja de
            herramientas,<br /> donde aún hay mucho lugar disponible.
          </p>
        </section>
        <About />
        <Tools />
        <Projects />
        <Cv />
        <Connect />
      </main>
      <Aside />
    </Suspense>
  );
}
