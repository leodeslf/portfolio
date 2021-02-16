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
  const data = {
    name: json.name,
    temp: Math.round(json.main.temp),
    text: json.weather[0].description,
    icon: json.weather[0].icon,
  }
  if (data.icon[2] === 'n') {
    let nums = [data.icon[0], data.icon[1]].join('');
    if ((+nums > 2 && +nums < 10) || (+nums > 10)) data.icon = nums + 'd';
  }
  data.icon = '#_' + data.icon;
  return data;
}
