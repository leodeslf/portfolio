import React, { useState } from 'react';
import weatherDataProvider from '../../js/weather';

export default function TW2() {
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

  const { temp, name, text } = data;

  return (
    <div className="preview__main preview--tw2">
      {!data && <p className="preview__caption">Cargando...</p>}
      {data && <div
        id="tw2__card"
        className="preview__body">
        <div className="card__content">
          <span className="card__temp">{temp}°</span>
          <span className="card__name">{name}</span>
          <span className="card__text">{text}</span>
        </div>
      </div>}
    </div>
  );
}
