import React, { Suspense, lazy } from 'react';

const SeeMore = lazy(() => import( /* webpackChunkName: "seemore" */ './SeeMore'));

export default function About() {
  return (
    <section id="about" className="portfolio__about portfolio__elem">
      <h1 title="Leonardo de Souza Leal Figueira">
        Leonardo de Souza Leal Figueira
      </h1>
      <p>
        <strong>Aprendiendo Desarrollo Frontend</strong>, como autodidacta,
        estudio cómo <strong>brindamos información</strong> y <strong>creamos
        experiencias</strong> en la web.
      </p>
      <Suspense fallback="">
        <SeeMore mod={'about'} children={
          <p className="see-more__hidden-block">
            Sin saber a qué área del software o diseño dedicarme, casi por accidente,
            descubrí el rol de Frontend. Desde entonces he aprendido conceptos
            y herramientas que puedan <strong>favorecer</strong> a compañeros
            de equipo durante el desarrollo y <strong>facilitar</strong> la
            experiencia del usuario final (y continuaré haciéndolo).
          </p>
        } />
      </Suspense>
    </section>
  );
}
