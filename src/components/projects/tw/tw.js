import { useDispatch, useSelector } from 'react-redux';
import fetchWeather from '../fetchWeather';
import { set as setWeather } from '../../../stores/weatherSlice';
import PreviewFallback from '../PreviewFallback';
import "./tw.scss";

export default function TW() {
  const dispatch = useDispatch();
  const { weather } = useSelector(state => state);

  if (!weather.code) {
    (async () => { dispatch(setWeather(await fetchWeather())); })();
  }

  return (
    (weather.code === 200 &&
      <div
        id="tw"
        className="preview__body"
      >
        <div className="tw__header">
          <span className="tw__name">
            <em>{`${weather.name}, ${weather.countryCode}`}</em>
          </span>
          <div className="tw__flag">
            <img
              src={`https://flagcdn.com/h20/${weather.countryCode}.png`}
              alt="Bandera nacional"
              title="Bandera nacional"
              width="16"
              height="12" />
          </div>
        </div>
        <div className="tw__temp">
          <p className="temp__current">{weather.temp}°</p>
          <p className="temp__max"><span>Máx</span>{weather.tempMax}°</p>
          <p className="temp__min"><span>Mín</span>{weather.tempMin}°</p>
        </div>
      </div>) ||
    (weather.code !== 200 && <PreviewFallback message={
      weather.code ?? true ?
        'Cargando...' :
        'Error al consultar OpenWeather.'
    } />)
  );
}
