import TOOLS from '../json/tools.json';

export default function Tools() {
  return (
    <section
      id="tools"
      className="portfolio__tools portfolio__elem"
    >
      <h2>Herramientas</h2>
      <div className="tools__groups">
        {TOOLS.map((toolsGroup, i) =>
          <ToolsGroup {...toolsGroup} key={i} />)}
      </div>
    </section>
  );
}

function ToolsGroup(toolsGroup) {
  return (
    <article className={
      `tools__group${toolsGroup.core ? ' tools__group--core' : ''}`}
      {...(toolsGroup.core && { title: 'Herramientas principales.' })}
    >
      <h3>
        {toolsGroup.title}
      </h3>
      <div className="tools__sub-groups">
        {toolsGroup.subGroups.map((subGroup, i) =>
          <ul key={i}>
            {subGroup.map((item, j) =>
              <li
                className="tools__item"
                key={j}
              >
                {item.value || item}
              </li>)}
          </ul>)}
      </div>
    </article>
  );
}
