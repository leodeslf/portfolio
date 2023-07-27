const url = [
  'https://api.openweathermap.org/data/2.5/weather?',
  'appid=b280c897878592322aafe56701248929&',
  'lang=sp&units=metric&q=Montevideo,UY'
].join('');

async function fetchWeather() {
  const json = await (await fetch(url)).json();
  return {
    code: json.cod,
    name: json.name,
    countryCode: json.sys.country.toLowerCase(),
    temp: Math.round(json.main.temp),
    tempMax: Math.round(json.main.temp_max),
    tempMin: Math.round(json.main.temp_min),
    text: json.weather[0].description,
  };
}

export default fetchWeather;
