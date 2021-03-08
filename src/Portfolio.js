import React, { lazy, Suspense } from 'react';

const ROOT = './components/';
const Projects = lazy(() => import(
  /* webpackChunkName: "projects", webpackPreload: true */
  ROOT + 'Projects.js'));
const Tools = lazy(() => import(
  /* webpackChunkName: "tools", webpackPreload: true */
  ROOT + 'Tools.js'));
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
            <a href="./">Leonardo de S. Leal</a>
          </h1>
          <p>
            Especializándome en <strong>Desarrollo Frontend</strong>,
            con <strong>React</strong> y <strong>SASS</strong> como principales
            herramientas, acompañadas de Angular, Vue y TypeScript.
          </p>
        </section>
        <section id="about" className="portfolio__about portfolio__elem">
          <h2>Sobre mí</h2>
          <p>
            Con gusto por el Diseño y el Desarrollo, sin saber a cuál de esas
            áreas dedicarme, mientras curioseaba sobre algunas tecnologías,
            -casi por accidente- encontré el rol perfecto, un tal Frontend.
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
        <section id="cv" className="portfolio__cv portfolio__elem">
          <h2>Currículum Vitae</h2>
          <p>
            Puede encontrar información personal, formación complementaria,
            orientación educativa, y poco más, en <a
              href="./res/Leonardo de Souza Leal Figueira - Desarrollador Frontend - CV 2021.pdf"
              title="CV en PDF">mi currículum</a>.
          </p>
        </section>
        <Connect />
      </main>
      <Aside />
    </Suspense>
  );
}
