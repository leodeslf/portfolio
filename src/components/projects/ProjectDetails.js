export default function ProjectDetails(props) {
  const { argument, tools,/*  res, */ links } = props;

  return (
    <div className="project__details">
      <h4>Objetivo</h4>
      <p>{argument}.</p>
      <h4>Herramientas</h4>
      <ul className="project__tools">
        {tools.old.map((item, i) => (
          <li key={i}>
            {item}
          </li>
        ))}
        {tools.new.map((item, i) => (
          <li
            className="project__new-tool"
            key={i}
          >
            {item} <sup title="Primer uso de la herramienta.">new</sup>
          </li>
        ))}
      </ul>
      {/* {res && <>
        <h4>Recursos</h4>
        <ul className="project__rsc">
          {res.map(({ name, link, linkName }, i) =>
            <li key={i}>
              {name} - <a href={link}>{linkName}</a>
            </li>
          )}
        </ul>
      </>} */}
      <footer className="project__footer">
        <p className="project__links">
          {links.map(({ name, link }, i) =>
            <span
              className="project__link-container"
              key={i}
            >
              <a href={link}>{name}</a>
            </span>
          )}.
        </p>
      </footer>
    </div>
  );
}
