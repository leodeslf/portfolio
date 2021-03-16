import React from 'react';
import TOOLS from '../json/tools.json';

export default function Tools() {
  return (
    <section id="tools" className="portfolio__tools portfolio__elem">
      <h2>Herramientas</h2>
      <div className="tools__container text--small">
        {TOOLS.map(({ title, tool_list }, i) => (
          <div key={i} className="portfolio__tool-group">
            <h2 className="h3">{title}</h2>
            <ul>
              {tool_list.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
