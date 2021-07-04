import { createContext, useEffect, useState } from 'react';
import PROJECTS from '../../json/projects.json';
import fetchWeatherData from './previews/preview-util/weather';
import Project from './Project';

export const WeatherDataContext = createContext();

export default function Projects() {
  // To be used by several projects.
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData().then(res => {
      if (res === false || res) setWeatherData(res);
    });
  }, []);

  return (
    <section id="projects" className="portfolio__projects portfolio__elem">
      <h2>Proyectos</h2>
      <div className="projects__container">
        <WeatherDataContext.Provider value={{ weatherData }}>
          {PROJECTS.map(item =>
            <Project {...item} key={item.preview} />)}
        </WeatherDataContext.Provider>
      </div>
    </section>
  );
}
