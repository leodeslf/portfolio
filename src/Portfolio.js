import React, { lazy, Suspense } from 'react';

const ROOT = './components/';
const About = lazy(() => import(
  /* webpackChunkName: "about", webpackPreload: true */
  ROOT + 'About.js'));
const Tools = lazy(() => import(
  /* webpackChunkName: "tools", webpackPreload: true */
  ROOT + 'Tools.js'));
const Projects = lazy(() => import(
  /* webpackChunkName: "projects", webpackPreload: true */
  ROOT + 'Projects.js'));
const Cv = lazy(() => import(
  /* webpackChunkName: "cv", webpackPreload: true */
  ROOT + 'Cv.js'));
const Connect = lazy(() => import(
  /* webpackChunkName: "connect", webpackPreload: true */
  ROOT + 'Connect.js'));
const Aside = lazy(() => import(
  /* webpackChunkName: "aside", webpackPreload: true */
  ROOT + 'Aside.js'));

export default function Portfolio() {
  return (
    <Suspense fallback="">
      <main className="portfolio">
        <section id="start" className="portfolio__start portfolio__elem">
          <h1 title="Leonardo de Souza Leal Figueira">
            Leonardo de S. Leal
          </h1>
          <p>
            Especializándome en <strong>Desarrollo Frontend</strong>,
            con <strong>React</strong> y <strong>SASS</strong> como
            principales herramientas, acompañadas de <strong>Angular</strong>
            , <strong>Vue</strong> y <strong>TypeScript</strong>.
          </p>
        </section>
        <About />
        <Projects />
        <Tools />
        <Cv />
        <Connect />
      </main>
      <Aside />
    </Suspense>
  );
}
