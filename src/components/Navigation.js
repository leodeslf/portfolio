export default function Navigation() {
  // Fragments (sections) format: [fragment-value, fragment-ui-name].
  const fragments = [
    ['start', 'Inicio'],
    ['about', 'Sobre mí'],
    ['projects', 'Proyectos'],
    ['tools', 'Herramientas'],
    ['cv', 'Currículum Vitae'],
    ['connect', 'Contacto']
  ];

  return (
    <nav className="stepper-nav text--small">
      <ul className="stepper-nav__list">
        {fragments.map((fragment, i) =>
          <li key={i}>
            <a
              className="step"
              href={'#' + fragment[0]}
              onClick={() => window.location.replace('#' + fragment[0])}
            >
              {fragment[1]}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
