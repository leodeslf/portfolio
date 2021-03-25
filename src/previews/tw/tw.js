import React, { useState } from 'react';
import weatherDataProvider from '../../js/weather';

export default function TW() {
  const [data, setData] = useState(false);

  window.addEventListener('load', () => {
    let askForData = setInterval(() => {
      const weatherData = weatherDataProvider();
      if (weatherData) {
        setData(weatherData);
        clearInterval(askForData)
      }
    }, 100);
  })

  const { name, countryCode, temp, tempMax, tempMin } = data;

  return (
    <div className="preview__main preview--tw">
      {!data && <p className="preview__caption">Cargando...</p>}
      {data && <div
        id="tw__card"
        className="preview__body">
        <div className="card__header">
          <span className="card__name">
            <em>{`${name}, ${countryCode}`}</em>
          </span>
          <div className="card__flag">
            <img
              src={'https://www.countryflags.io/' + countryCode +
                '/shiny/16.png'}
              alt="Bandera nacional"
              title="Bandera nacional"
              width="16"
              height="16" />
          </div>
        </div>
        <hr />
        <div className="card__temp">
          <p className="temp__current">{temp}°</p>
          <p className="temp__max"><span>Máx</span>{tempMax}°</p>
          <p className="temp__min"><span>Mín</span>{tempMin}°</p>
        </div>
      </div>}
    </div>
  );
}
