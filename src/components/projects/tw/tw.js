import { useEffect, useState } from 'react';
import PreviewFallback from '../PreviewFallback';
import { getWeatherData } from '../weather';
import "./tw.scss";

let interval;

export default function TW() {
  const [data, setData] = useState({ code: undefined });

  const askForData = () => {
    getWeatherData().then(res => {
      if (res) {
        clearInterval(interval);
        setData(res);
      }
    });
  }

  useEffect(() => {
    interval = setInterval(askForData, 140);
  }, []);

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
          <hr />
          <div className="card__temp">
            <p className="temp__current">{data.temp}°</p>
            <p className="temp__max"><span>Máx</span>{data.tempMax}°</p>
            <p className="temp__min"><span>Mín</span>{data.tempMin}°</p>
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
