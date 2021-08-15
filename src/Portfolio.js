import Projects from './components/Projects';
import Tools from './components/Tools';
import Cv from './components/Cv';
import Connect from './components/Connect';
import Aside from './components/Aside';
import LiveBG from './components/LiveBG';

export default function Portfolio() {
  return (
    <>
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
            entre ambas áreas: el Desarrollo Frontend. Desde entonces, me
            dediqué a <em>aprender haciendo</em> como autodidacta.
          </p>
        </section>
        <Projects />
        <Tools />
        <Cv />
        <Connect />
      </main>
      <Aside />
      <LiveBG />
    </>
  );
}
