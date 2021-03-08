const OPEN_WEATHER_URL = [
  'https://api.openweathermap.org/data/2.5/weather?',
  'appid=b280c897878592322aafe56701248929&',
  'lang=sp&units=metric&q=Montevideo,UY'
].join('');

export async function fetchWeatherData() {
  return await (await fetch(OPEN_WEATHER_URL)).json();
}
