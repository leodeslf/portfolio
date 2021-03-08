import { fetchWeatherData } from '../../js/weather';

export async function getDataForTW2() {
  const json = await fetchWeatherData();
  return json.cod === 200 ? {
    name: json.name,
    temp: Math.round(json.main.temp),
    text: json.weather[0].description,
  } : false;
}
