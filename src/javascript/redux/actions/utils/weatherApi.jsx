import axios from 'axios';

export const month = 'jan';

export const getWeatherById = (id) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&type=accurate&APPID=9bbaed744c5bf102556c1d6b1c8e1ed8`;
  const output = axios.get(url)
    .then(results => (results.status === 200 ? results.data : {}))
    .catch(() => undefined);

  return output;
};
