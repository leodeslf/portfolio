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

const displayName = "Leonardo de S. Leal";

export default function Portfolio() {
  return (
    <Suspense fallback="">
      <main className="portfolio">
        <section id="start" className="portfolio__start portfolio__elem">
          <h1 title="Leonardo de Souza Leal Figueira">
            {displayName}
          </h1>
          <p>
            Aprendiendo y especializándome en <strong>Desarrollo Frontend</strong>,<br />
            con <strong>React</strong> y <strong>SASS</strong> como principales herramientas,<br />
            acompañadas de <strong>Angular</strong>, <strong>Vue</strong> y <strong>TypeScript</strong>.
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
