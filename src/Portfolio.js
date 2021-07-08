import { lazy, Suspense/* , useEffect */ } from 'react';
/* import { startListeningToScroll } from './js/scroll'; */

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

export default function Portfolio() {
  /* useEffect(() => {
    startListeningToScroll();
  }, []); */

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
            Siempre atraído por el Diseño y la Prgramación, encontré casi por
            accidente el rol perfecto para mi, uno que me permite desempeñar en
            todo lo que disfruto al mismo tiempo, el Desarrollo Frontend.
          </p>
          <p>
            Desde entonces, me he dedicado a <em>aprender haciendo</em> con
            herramientas que nos permiten: <strong>agilizar</strong> el
            desarrollo; <strong>potenciar</strong> el trabajo en equipo;
            y <strong>enriquecer</strong> la experiencia del usuario.
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
