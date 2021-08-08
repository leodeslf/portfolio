import { useContext } from 'react';
import PreviewFallback from '../PreviewFallback';
import { WeatherDataContext } from '../../Projects';

export default function TW2() {
  const { weatherData } = useContext(WeatherDataContext);

  return (
    (weatherData &&
      <div className="preview--tw2">
        <div
          id="tw2__card"
          className="preview__body"
        >
          <div className="card__content">
            <span className="card__temp">{weatherData.temp}°</span>
            <span className="card__name">{weatherData.name}</span>
            <span className="card__text">{weatherData.text}</span>
          </div>
        </div>
      </div>) ||
    (!weatherData && <PreviewFallback message={
      weatherData === null ?
        'Cargando...' :
        'Error al consultar OpenWeather.'
    } />)
  );
}
