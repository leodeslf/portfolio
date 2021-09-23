import { useEffect, useState } from 'react';
import PreviewFallback from '../PreviewFallback';
import { getWeatherData, weatherData } from '../weather';
import "./tw2.scss";

let interval;

export default function TW2() {
  const [data, setData] = useState({ code: undefined });
  const [mounted, setMounted] = useState(true);

  const askForData = () => {
    getWeatherData().then(res => {
      // If component gets aa valid response and it's mounted.
      if (res && mounted) {
        clearInterval(interval);
        setData(res);
      }
    });
  }

  useEffect(() => {
    if (data.code ?? true) askForData();
    if (!weatherData) interval = setInterval(askForData, 140);
    return () => setMounted(false);
  });

  return (
    (data.code === 200 &&
      <div className="preview--tw2">
        <div
          id="tw2__card"
          className="preview__body"
        >
          <div className="card__content">
            <span className="card__temp">{data.temp}°</span>
            <span className="card__name">{data.name}</span>
            <span className="card__text">{data.text}</span>
          </div>
        </div>
      </div>) ||
    (data.code !== 200 && <PreviewFallback message={
      data.code === undefined ?
        'Cargando...' :
        'Error al consultar OpenWeather.'
    } />)
  );
}
