import { useEffect, useState } from 'react';
import PreviewFallback from '../PreviewFallback';
import { getWeatherData, weatherData } from '../weather';
import "./tw.scss";

let interval;

export default function TW() {
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
      <div className="preview--tw">
        <div
          id="tw__card"
          className="preview__body"
        >
          <div className="card__header">
            <span className="card__name">
              <em>{`${data.name}, ${data.countryCode}`}</em>
            </span>
            <div className="card__flag">
              <img
                src={
                  'https://www.countryflags.io/' +
                  data.countryCode +
                  '/shiny/16.png'
                }
                alt="Bandera nacional"
                title="Bandera nacional"
                width="16"
                height="16"
              />
            </div>
          </div>
          <div className="card__temp">
            <p className="temp__current">{data.temp}°</p>
            <p className="temp__max"><span>Máx</span>{data.tempMax}°</p>
            <p className="temp__min"><span>Mín</span>{data.tempMin}°</p>
          </div>
        </div>
      </div>) ||
    (data.code !== 200 && <PreviewFallback message={
      data.code ?? true ?
        'Cargando...' :
        'Error al consultar OpenWeather.'
    } />)
  );
}
