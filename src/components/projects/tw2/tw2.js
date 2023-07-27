import { useDispatch, useSelector } from 'react-redux';
import fetchWeather from '../fetchWeather';
import { set as setWeather } from '../../../stores/weatherSlice';
import PreviewFallback from '../PreviewFallback';
import "./tw2.scss";

export default function TW2() {
  const dispatch = useDispatch();
  const { weather } = useSelector(state => state);

  if (!weather.code) {
    (async () => { dispatch(setWeather(await fetchWeather())); })();
  }

  return (
    (weather.code === 200 &&
      <div
        id="tw2"
        className="preview__body"
      >
        <div className="tw2__content">
          <span className="tw2__temp">{weather.temp}°</span>
          <span className="tw2__name">{weather.name}</span>
          <span className="tw2__text">{weather.text}</span>
        </div>
      </div>) ||
    (weather.code !== 200 && <PreviewFallback message={
      weather.code === undefined ?
        'Cargando...' :
        'Error al consultar OpenWeather.'
    } />)
  );
}
