import { fetchWeatherData } from "../../js/weather"

export async function getDataForTW() {
  const json = await fetchWeatherData();
  return json.cod === 200 ? {
    name: json.name,
    countryCode: json.sys.country,
    temp: Math.round(json.main.temp),
    tempMax: Math.round(json.main.temp_max),
    tempMin: Math.round(json.main.temp_min),
  } : false;
}