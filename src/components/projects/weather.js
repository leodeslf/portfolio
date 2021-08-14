const OPEN_WEATHER_URL = [
  'https://api.openweathermap.org/data/2.5/weather?',
  'appid=b280c897878592322aafe56701248929&',
  'lang=sp&units=metric&q=Montevideo,UY'
].join('');

let fetched = false;

export default async function fetchWeatherData() {
  // Avoid repeating identical requests.  
  if (fetched) return null;
  fetched = true;

  const data = await (await fetch(OPEN_WEATHER_URL)).json();
  return {
    code: data.cod,
    name: data.name,
    countryCode: data.sys.country,
    temp: Math.round(data.main.temp),
    tempMax: Math.round(data.main.temp_max),
    tempMin: Math.round(data.main.temp_min),
    text: data.weather[0].description,
  };
}
