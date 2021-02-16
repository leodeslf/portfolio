const openweatherapi = [
  'https://api.openweathermap.org/data/2.5/weather?',
  'appid=b280c897878592322aafe56701248929&',
  'lang=sp&units=metric&q=Montevideo,UY'
].join('');

export async function fetchData(query) {
  const res = await fetch(openweatherapi + query)
  const jsonData = await res.json()
  return processData(jsonData);
}

function processData(json) {
  return {
    name: json.name,
    countryCode: json.sys.country,
    temp: Math.round(json.main.temp),
    tempMax: Math.round(json.main.temp_max),
    tempMin: Math.round(json.main.temp_min),
  }
}