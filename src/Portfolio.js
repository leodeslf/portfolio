import { lazy, Suspense } from 'react';

const ROOT = './components/';

const Projects = lazy(() => import(/* webpackChunkName: "projects" */
  ROOT + 'projects-stuff/Projects.js'));
const Tools = lazy(() => import(/* webpackChunkName: "tools" */
  ROOT + 'Tools.js'));
const Cv = lazy(() => import(/* webpackChunkName: "cv" */
  ROOT + 'Cv.js'));
const Connect = lazy(() => import(/* webpackChunkName: "connect" */
  ROOT + 'Connect.js'));
const Aside = lazy(() => import(/* webpackChunkName: "aside" */
  ROOT + 'Aside.js'));
const LiveBG = lazy(() => import(/* webpackChunkName: "live-bg" */
  ROOT + 'LiveBG.js'));

export default function Portfolio() {
  return (
    <Suspense fallback="">
      <main className="portfolio">
        <section id="start" className="portfolio__start portfolio__elem">
          <h1 title="Leonardo de Souza Leal Figueira">
            <a href="./">Leonardo de S. Leal</a>
          </h1>
          <p className="start__description">
            Entusiasta del <strong>Frontend</strong>, enfocado
            en <strong>React</strong> y <strong>SASS</strong>.
          </p>
        </section>
        <section id="about" className="portfolio__about portfolio__elem">
          <h2>Sobre mí</h2>
          <p>
            Siempre atraído tanto por el <em>Diseño</em> como por la <em>
            Programación</em>, encontré casi por accidente el balance perfecto
            entre ambas áreas: el Desarrollo Frontend. Desde entonces, me he
            dedicado a <em> aprender haciendo</em> con las herramientas más
            demandadas, y seguiré por mucho tiempo más.
          </p>
        </section>
        <Projects />
        <Tools />
        <Cv />
        <Connect />
      </main>
      <Aside />
      <LiveBG />
    </Suspense>
  );
}
