import React from 'react'

export default function Cv() {
  return (
    <section id="cv" className="portfolio__cv portfolio__elem">
      <h2>Currículum Vitae</h2>
      <p>
        Puede encontrar datos como mi orientación educativa, formación
        complementaria, idiomas, y poco más, en <a
          href="./res/Leonardo de S. Leal - Desarrollo Frontend - CV 2021.pdf"
          title="CV en PDF">mi currículum</a>.
      </p>
      <div className="cv__preview">
        <p><em>&lt;!-- Vista previa: --&gt;</em></p>
        <h3><span>#</span> Currículum Vitae</h3>
        <h4><span>##</span> ORIENTACIÓN EDUCATIVA</h4>
        <p>
          <strong>EMT Informática</strong> - <em>Escuela Superior de
            Informática</em>
        </p>
        <h4><span>##</span> FORMACIÓN COMPLEMENTARIA</h4>
        <p>
          <strong>Desarrollo Frontend</strong> - <em>Autodidacta</em><br />
          <strong>Testing Funcional de Software</strong> - <em>Fundación
            Forge</em><br />
          <strong>Diseño Gráfico</strong> - <em>Escuela Interamericana de
            Ciencias Informáticas</em>
        </p>
        <h4><span>##</span> IDIOMAS</h4>
        <p>
          <strong>Portugués</strong> - <em>Materno</em><br />
          <strong>Inglés</strong> - <em>Intermedio</em>
          <span className="cv__preview-end"></span>
        </p>
      </div>
    </section>
  );
}
