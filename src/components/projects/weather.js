const OPEN_WEATHER_URL = [
  'https://api.openweathermap.org/data/2.5/weather?',
  'appid=b280c897878592322aafe56701248929&',
  'lang=sp&units=metric&q=Montevideo,UY'
].join('');
let weatherData = false;
let requesting = false;

async function fetchWeatherData() {
  //requesting = false;
  const json = await (await fetch(OPEN_WEATHER_URL)).json();
  return weatherData = {
    code: json.cod,
    name: json.name,
    countryCode: json.sys.country,
    temp: Math.round(json.main.temp),
    tempMax: Math.round(json.main.temp_max),
    tempMin: Math.round(json.main.temp_min),
    text: json.weather[0].description,
  };
}

async function getWeatherData() {
  if (weatherData) return weatherData;
  if (requesting) return false;
  if (!requesting) {
    requesting = true;
    return await fetchWeatherData();
  }
}

export { weatherData, getWeatherData };
