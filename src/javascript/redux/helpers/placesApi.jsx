import axios from 'axios';

const getCitySuggestions = (query) => {
  const url = `https://api.teleport.org/api/cities/?search=${query}&limit=5`;
  const output = axios.get(url)
    .then(({ data, status }) => (status === 200 ? data : {}))
    .catch(error => error);

  return output;
};

const getCityDetails = (url) => {
  const href = url.length > 10 ? url : `https://api.teleport.org/api/cities/geonameid:${url}/`;

  const output = axios.get(href)
    .then(({ data, status }) => (status === 200 ? data : {}))
    .catch(error => error);

  return output;
};

export {
  getCityDetails,
  getCitySuggestions,
};
