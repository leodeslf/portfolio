import { useState } from "react";
import Project from "./Project";
import PROJECTS_JSON from '../../json/projects.json';

const projectsN = PROJECTS_JSON.length - 1;

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const projects = [];
  PROJECTS_JSON.forEach((project, i) => projects[i] = <Project {...project} />);

  const goToPrev = () => setIndex(index - 1 > -1 ? index - 1 : projectsN);
  const goToNext = () => setIndex(index + 1 <= projectsN ? index + 1 : 0);

  return (
    <div className="projects__carousel">
      <button
        aria-label="Previous"
        className="carousel__item--left"
        onClick={goToPrev}
      >
        {projects[index - 1 > -1 ? index - 1 : projectsN]}
      </button>
      <button
        aria-label="Next"
        className="carousel__item--right"
        onClick={goToNext}
      >
        {projects[index + 1 <= projectsN ? index + 1 : 0]}
      </button>
      <div className="carousel__item--center">
        {projects[index]}
      </div>
    </div>
  );
}
