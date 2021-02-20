import React, { lazy, Suspense } from 'react';

const ROOT = './components/';
const Projects = lazy(() => import(
  /* webpackChunkName: "projects", webpackPreload: true */
  ROOT + 'Projects.js'));
const Tools = lazy(() => import(
  /* webpackChunkName: "tools", webpackPreload: true */
  ROOT + 'Tools.js'));
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
        <section id="about" className="portfolio__about portfolio__elem">
          <h2>Sobre mí</h2>
          <p>
            Con gusto por el Diseño y el Desarrollo, sin saber a cuál de esas áreas
            dedicarme, mientras curioseaba sobre algunas tecnologías, -casi por
            accidente- encontré el rol perfecto, un tal Frontend.
          </p>
          <p>
            Desde entonces, aprendí herramientas
            que permiten <strong>agilizar</strong> el
            desarrollo, <strong>potenciar</strong> el trabajo en
            equipo y <strong>enriquecer</strong> la experiencia
            del usuario final.
          </p>
        </section>
        <Projects />
        <Tools />
        <Cv />
        <Connect />
      </main>
      <Aside />
    </Suspense>
  );
}
