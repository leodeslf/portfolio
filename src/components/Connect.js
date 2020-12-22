import React from 'react';

const email = 'leodeslf@gmail.com';

export default function Connect() {
  return (
    <section id="connect" className="portfolio__connect portfolio__elem">

      <div
        itemScope
        itemType="https://schema.org/Person"
        className="connect__card text--small">
        <ul className="card__data">
          <li>
            <h2>Contacto</h2>
          </li>
          <li
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Montevideo
            </span>, <span itemProp="addressRegion">UY</span>
          </li>
          <li>
            <span itemProp="telephone">+598 99 705 972</span>
          </li>
          <li>
            <label htmlFor="email">
              <input
                className="input-to-copy"
                id="email"
                readOnly
                type="text"
                value={email}
                onClick={e => {
                  e.target.select();
                  document.execCommand('copy');
                }}
                itemProp="email" />
            </label>
          </li>
          <li>
            <a href="https://github.com/leodeslf">GitHub</a> / <a
              href="https://linkedin.com/in/leodeslf">LinkedIn</a>
          </li>
        </ul>
        <picture className="card__pic">
          <source srcSet='./images/id_32c.webp 1x' type="image/webp" />
          <source srcSet='./images/id_256c.webp 2x' type="image/webp" />
          <source srcSet='./images/id_256c.webp 3x' type="image/webp" />
          <source srcSet='./images/id_32c.png 1x' type="image/png" />
          <source srcSet='./images/id_256c.png 2x' type="image/png" />
          <source srcSet='./images/id_256c.png 3x' type="image/png" />
          <img
            src='./images/id_32c.png'
            alt="A human been."
            title="A human been."
            width="90"
            height="132"
            itemProp="image" />
        </picture>
      </div>
    </section>
  );
}
