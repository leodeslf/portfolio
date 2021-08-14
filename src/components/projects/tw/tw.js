import { useContext } from 'react';
import PreviewFallback from '../PreviewFallback';
import { WeatherDataContext } from '../../Projects';

export default function TW() {
  const { weatherData } = useContext(WeatherDataContext);

  return (
    (weatherData.code === 200 &&
      <div className="preview--tw">
        <div
          id="tw__card"
          className="preview__body"
        >
          <div className="card__header">
            <span className="card__name">
              <em>{`${weatherData.name}, ${weatherData.countryCode}`}</em>
            </span>
            <div className="card__flag">
              <img
                src={
                  'https://www.countryflags.io/' +
                  weatherData.countryCode +
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
            <p className="temp__current">{weatherData.temp}°</p>
            <p className="temp__max"><span>Máx</span>{weatherData.tempMax}°</p>
            <p className="temp__min"><span>Mín</span>{weatherData.tempMin}°</p>
          </div>
        </div>
      </div>) ||
    (weatherData.code !== 200 && <PreviewFallback message={
      weatherData.code === undefined ?
        'Cargando...' :
        'Error al consultar OpenWeather.'
    } />)
  );
}
