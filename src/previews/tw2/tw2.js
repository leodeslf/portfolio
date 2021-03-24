import React, { useEffect, useState } from 'react';
import { getDataForTW2 } from './control';

export default function TW2() {
  const [data, setData] = useState({});
  const { temp, name, text } = data;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataForTW2().then(res => {
      if (res) {
        setData(res);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="preview__main preview--tw2">
      {loading && <p>Cargando...</p>}
      {!loading &&
        <div
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
