import React, { useEffect, useState } from 'react';
import { getDataForTW } from './control';

export default function TW() {
  const [data, setData] = useState({});
  const { name, countryCode, temp, tempMin, tempMax } = data;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataForTW().then(res => {
      if (res) {
        setData(res);
        setLoading(false);
      }
    });
  }, []);

  const [windowLoaded, setWindowLoaded] = useState(false);
  window.addEventListener('load', () => setWindowLoaded(true));

  return (
    <div className="preview__main preview--tw">
      {loading && <p>Cargando...</p>}
      {!loading &&
        <div
          id="tw__card"
          className="preview__body">
          <div className="card__header">
            <span className="card__name">
              <em>{`${name}, ${countryCode}`}</em>
            </span>
            <div className="card__flag">
              {windowLoaded && <img
                src={'https://www.countryflags.io/' + countryCode +
                  '/shiny/16.png'}
                alt="Bandera nacional"
                title="Bandera nacional"
                width="16"
                height="16" />}
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
