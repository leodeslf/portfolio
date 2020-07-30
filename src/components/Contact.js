import React from 'react';

const ORIGIN = './images/id_pic';

export default function Contact() {
  return (
    <section id="contact" className="portfolio__contact portfolio__elem">
      <h2>Contacto</h2>
      <div className="contact__card">
        <picture className="card__pic">
          <source type="image/webp" srcSet={`${ORIGIN}.webp`} />
          <img src={`${ORIGIN}.gif`} alt={`${ORIGIN}`} title="A human been" />
        </picture>
        <ul className="card__data">
          <li>Montevideo, UY</li>
          <li>+598 99 705 972</li>
          <li>leodeslf@gmail.com</li>
          <li>
            <a href="https://github.com/leodeslf">GitHub</a> / <a
              href="https://www.linkedin.com/in/leodeslf/">LinkedIn</a>
          </li>
        </ul>
      </div>
    </section>
  );
}
