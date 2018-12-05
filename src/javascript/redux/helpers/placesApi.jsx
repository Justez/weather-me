import axios from 'axios';

const getCitySuggestions = (query) => {
  const url = `https://api.teleport.org/api/cities/?search=${query}&limit=5`;
  const output = axios.get(url)
    .then(results => (results.status === 200 ? results.data : {}))
    .catch(error => error);

  return output;
};

const getCityDetails = (url) => {
  const output = axios.get(url)
    .then(results => (results.status === 200 ? results.data : {}))
    .catch(error => error);

  return output;
};

export {
  getCityDetails,
  getCitySuggestions,
};
