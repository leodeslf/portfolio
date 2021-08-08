import { useState } from "react";
import Project from "./Project";
import PROJECTS from '../../json/projects.json';

const projectsN = PROJECTS.length - 1;

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const projects = PROJECTS.map(item => <Project {...item} />);
  const goToPrev = () => setIndex(index - 1 > -1 ? index - 1 : projectsN);
  const goToNext = () => setIndex(index + 1 <= projectsN ? index + 1 : 0);

  return (
    <div className="projects__carousel">
      {projects[index]}
      <div className="carousel__controls">
        <div className="control__prev" onClick={goToPrev}></div>
        <div className="control__dots">
          {PROJECTS.map((_, i) =>
            <span
              key={i}
              className={`dot${index === i ? ' dot--active' : ''}`}
              onClick={() => setIndex(i)}
            ></span>
          )}
        </div>
        <div className="control__next" onClick={goToNext}></div>
      </div>
    </div>
  );
}
