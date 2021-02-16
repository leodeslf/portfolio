const openweatherapi = [
  'https://api.openweathermap.org/data/2.5/weather?',
  'appid=b280c897878592322aafe56701248929&',
  'lang=sp&units=metric&q=Montevideo,UY'
].join('');

export async function fetchWeatherData() {
  const res = await fetch(openweatherapi)
  const jsonData = await res.json()
  return jsonData;
}
