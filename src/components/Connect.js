import React, { useState } from 'react';

export default function Connect() {
  const [loaded, setLoaded] = useState(false);
  window.addEventListener('load', () => setLoaded(true));

  return (
    <section id="connect" className="portfolio__connect portfolio__elem">
      <div
        itemScope
        itemType="https://schema.org/Person"
        className="connect__card text--small">
        <ul className="card__data">
          <li>
            <h2 className="h3">Contacto</h2>
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
            <label htmlFor="email" title="Copiar al portapapeles.">
              <input
                className="input-to-copy"
                id="email"
                readOnly
                type="text"
                value="leodeslf@gmail.com"
                onClick={e => {
                  e.target.select();
                  document.execCommand('copy');
                }}
                itemProp="email" />
              <span className="icon icon--21">
                <svg viewBox="0 0 21 21">
                  <path d="M13.14,3H4.93A1.38,1.38,0,0,0,3.56,4.34v9.58H4.93
                  V4.34h8.21Zm2,2.74H7.67A1.38,1.38,0,0,0,6.3,7.08v9.58A1.38,
                  1.38,0,0,0,7.67,18h7.52a1.37,1.37,0,0,0,1.37-1.37V7.08A1.37,
                  1.37,0,0,0,15.19,5.71Zm0,11H7.67V7.08h7.52Z" />
                </svg>
              </span>
            </label>
          </li>
          <li>
            <a
              href="https://github.com/leodeslf"
              title="Perfil de GitHub.">
              GitHub
              </a> / <a
              href="https://linkedin.com/in/leodeslf"
              title="Perfil de LinkedIn">
              LinkedIn
              </a>
          </li>
        </ul>
        {loaded && <picture className="card__pic">
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
        </picture>}
      </div>
    </section>
  );
}
