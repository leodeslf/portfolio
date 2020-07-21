import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="contact Portfolio__elem">
      <h2>Contacto</h2>
      <div className="contact__card">
        <picture className="card__pic">
          <source type="image/webp" srcSet="./x120.webp" />
          <img src="./x120.png" alt="id_pic" title="A Human Been" />
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

/* <a href="https://dribbble.com/Wikarot">Dribbble</a> */
