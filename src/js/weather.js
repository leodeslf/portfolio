const OPEN_WEATHER_URL = [
  'https://api.openweathermap.org/data/2.5/weather?',
  'appid=b280c897878592322aafe56701248929&',
  'lang=sp&units=metric&q=Montevideo,UY'
].join('');

let weatherData = false;

export default function weatherDataProvider() {
  return weatherData;
};

async function fetchWeatherData() {
  const data = await (await fetch(OPEN_WEATHER_URL)).json();
  return data.cod === 200 ? {
    name: data.name,
    countryCode: data.sys.country,
    temp: Math.round(data.main.temp),
    tempMax: Math.round(data.main.temp_max),
    tempMin: Math.round(data.main.temp_min),
    text: data.weather[0].description,
  } : false;
}

window.addEventListener('load', () => {
  fetchWeatherData().then(res => {
    if (res) weatherData = res;
  });
});
