import axios from 'axios';

const base = 'https://api.teleport.org/api/cities/';

const getCitySuggestions = (query) => {
  const url = `${base}?search=${query}&limit=5`;
  const output = axios.get(url)
    .then(({ data, status }) => (status === 200 ? data : {}));
  return output;
};

const getCityDetails = (url) => {
  const href = url.length > 10 ? url : `${base}geonameid:${url}/`;
  const output = axios.get(href)
    .then(({ data, status }) => (status === 200 ? data : {}));
  return output;
};

export {
  getCityDetails,
  getCitySuggestions,
};
