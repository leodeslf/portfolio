import React from 'react';
import PropTypes from 'prop-types';
import TOOLS from '../json/tools.json';

export default function Tools() {
  return (
    <section id="tools" className="portfolio__tools portfolio__elem">
      <h2>Herramientas</h2>
      <div className="tools__container">
        {TOOLS.map(({ title, tool_list }, i) => (
          <ToolGroup
            key={i}
            title={title}
            tool_list={tool_list} />
        ))}
      </div>
    </section>
  );
}

function ToolGroup({ title, tool_list }) {
  return (
    <div className="tools__item">
      <strong>{title}:</strong>
      <ul>
        {tool_list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

ToolGroup.propTypes = {
  title: PropTypes.string.isRequired,
  tool_list: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
}
