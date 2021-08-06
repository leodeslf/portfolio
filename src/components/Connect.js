export default function Connect() {
  const email = 'leodeslf@gmail.com'

  return (
    <section id="connect" className="portfolio__connect portfolio__elem">
      <div
        itemScope
        itemType="https://schema.org/Person"
        className="connect__card text--small">
        <ul className="connect__data">
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
          <li className="data__email">
            <button
              className="email-button"
              title="Copiar al portapapeles."
              onClick={() => navigator.clipboard.writeText(email)}
            >
              {email}
            </button>
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
        <picture className="connect__pic">
          <source srcSet='./images/x132_32c.webp 1x' type="image/webp" />
          <source srcSet='./images/x132_64c.webp 2x' type="image/webp" />
          <source srcSet='./images/x132_256c.webp 3x' type="image/webp" />
          <source srcSet='./images/x132_32c.png 1x' type="image/png" />
          <source srcSet='./images/x132_64c.png 2x' type="image/png" />
          <source srcSet='./images/x132_256c.png 3x' type="image/png" />
          <img
            src='./images/id_256c.png'
            alt="leodeslf"
            title="A human been."
            width="90"
            height="132"
            itemProp="image"
            loading="lazy"
          />
        </picture>
      </div>
    </section>
  );
}
