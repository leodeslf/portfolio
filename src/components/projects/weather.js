const OPEN_WEATHER_URL = [
  'https://api.openweathermap.org/data/2.5/weather?',
  'appid=b280c897878592322aafe56701248929&',
  'lang=sp&units=metric&q=Montevideo,UY'
].join('');
let data = false;
let requesting = false;

async function fetchWeatherData() {
  //requesting = false;
  const json = await (await fetch(OPEN_WEATHER_URL)).json();
  return data = {
    code: json.cod,
    name: json.name,
    countryCode: json.sys.country,
    temp: Math.round(json.main.temp),
    tempMax: Math.round(json.main.temp_max),
    tempMin: Math.round(json.main.temp_min),
    text: json.weather[0].description,
  };
}

export async function getWeatherData() {
  if (data) return data;
  if (requesting) return false;
  if (!requesting) {
    requesting = true;
    return await fetchWeatherData();
  }
}
