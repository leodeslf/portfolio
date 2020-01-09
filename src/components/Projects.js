import React from 'react';
import PropTypes from 'prop-types';
import PROJECTS from '../projects.json';

export default function Projects() {
  return (
    <section id="projects" className="projects Portfolio__elem">
      <h2>Proyectos</h2>
      {PROJECTS.map(item => (
        <ProjectItem
          key={item.id}
          data={item} />
      ))}
    </section>
  );
}

function ProjectItem(props) {
  return (
    <article className="projects__elem">
      <h3>{props.data.title}</h3><em className="date">{props.data.date}</em>
      <p>{`${props.data.about}.`}</p>
      <input id={`chk_${props.data.id}`} type="checkbox" className="custom-chk__chk" />
      <label htmlFor={`chk_${props.data.id}`} className="custom-chk__lbl"></label>
      <div className="description">
        <p>
          <strong>Objetivo: </strong>{`${props.data.argument}.`}
        </p>
        {(props.data.old_stack || props.data.new_stack) &&
          <>
            <strong>Stack: </strong>
            <ul>
              {props.data.old_stack &&
                <OldStack old_stack={props.data.old_stack} />}
              {props.data.new_stack &&
                <NewStack new_stack={props.data.new_stack} />}
            </ul>
          </>
        }
        {props.data.src &&
          <>
            <strong>Recursos: </strong>
            <ResourceList src={props.data.src} />
          </>
        }
        {props.data.web &&
          <p>
            <strong>Links: </strong>
            <a href={props.data.web}>Web</a>
            {props.data.repo &&
              <>
                , <a href={props.data.repo}>Repositorio</a>
              </>}.
          </p>
        }
      </div>
    </article>
  );
}

ProjectItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    argument: PropTypes.string.isRequired,
    old_stack: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    new_stack: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    src: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      linkName: PropTypes.string.isRequired,
    })),
    web: PropTypes.string,
    repo: PropTypes.string,
  })
}

function OldStack(props) {
  return (
    <>
      {props.old_stack.map(item => (
        <li className="old-stack-item" key={item.id}>
          {`${item.name}`}
        </li>
      ))}
    </>
  );
}

OldStack.propTypes = {
  old_stack: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
}

function NewStack(props) {
  return (
    <>
      {props.new_stack.map(item => (
        <li className="new-stack-item" title="Nuevo" key={item.id}>
          {`${item.name}`}
        </li>
      ))}
    </>
  );
}

NewStack.propTypes = {
  new_stack: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
}

function ResourceList(props) {
  return (
    <ul className="src-list">
      {props.src.map(item => (
        <li key={item.id}>{item.name} - <a href={item.link}>{item.linkName}</a></li>
      ))}
    </ul>
  );
}

ResourceList.prototypes = {
  src: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkName: PropTypes.string.isRequired,
  }))
}
