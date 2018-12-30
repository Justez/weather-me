/* eslint-disable no-undef */
import axios from 'axios';
import { isCityFavoriteInStorage } from './storageRegistry';
import { calcForecast } from './calcForecast';

const month = 'jan';

const getWeatherSuccess = () => ({
  type: 'GET_WEATHER_FORECAST_SUCCESS',
});

const setCurrentWeather = weather => ({
  type: 'SET_CURRENT_WEATHER_FORECAST',
  payload: weather,
});

const setPlaceCountry = payload => ({
  type: 'SET_PLACE_COUNTRY',
  payload,
});

const getWeatherById = (id) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&type=accurate&APPID=9bbaed744c5bf102556c1d6b1c8e1ed8`;
  const output = axios.get(url)
    .then(({ data, status }) => (status === 200 ? data : {}))
    .catch(() => undefined);

  return output;
};

const getWeatherConditionsByCoords = ({ lat, lng }) => (dispatch) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&type=accurate&units=metric&appid=a429ae35ba6d0809fa7eecb77a605911`;
  axios.get(url)
    .then(({ data, status }) => {
      if (data.cod === 200 && status === 200) {
        isCityFavoriteInStorage(data.id, data.sys.country)
          .then((favorite) => {
            const output = { ...data, favorite };
            dispatch(setPlaceCountry(data.sys.country));
            dispatch(setCurrentWeather(output));
            dispatch(getWeatherSuccess());
          });
      }
    })
    .catch(() => {});
};

const placeDescriptionSuccess = place => ({
  type: 'SET_PLACE_DESCRIPTION',
  payload: place,
});

const getForecastStarted = () => ({
  type: 'GET_FORECAST_STARTED',
});

const getForecastSuccess = () => ({
  type: 'GET_FORECAST_SUCCESS',
});

const getForecastFailed = () => ({
  type: 'GET_FORECAST_FAILED',
});

const getWeatherForecastByCoords = ({ lat, lng }) => (dispatch) => {
  dispatch(getForecastStarted());
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&type=accurate&mode=json0&APPID=9bbaed744c5bf102556c1d6b1c8e1ed8`;
  axios.get(url)
    .then((results) => {
      if (results.status === 200 && results.data.cod === '200') {
        dispatch(calcForecast(results.data));
        dispatch(placeDescriptionSuccess(results.data.city.name));
        dispatch(getForecastSuccess());
      } else dispatch(getForecastFailed());
    })
    .catch(() => dispatch(getForecastFailed()));
};

export {
  month,
  getWeatherById,
  getWeatherConditionsByCoords,
  getWeatherForecastByCoords,
};
