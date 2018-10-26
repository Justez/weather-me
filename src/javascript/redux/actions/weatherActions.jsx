/* eslint-disable no-undef */
import axios from 'axios';
import { calcForecast } from './functions/calcForecast';
import { findCityInCookies } from './functions/cookieRegistry';

export const setLocationAction = details => (dispatch) => {
  dispatch({
    type: 'SET_LOCATION_DETAILS',
    payload: details,
  });
};

const navigatorStarted = () => ({
  type: 'NAVIGATOR_STARTED',
});

const navigatorSuccess = payload => ({
  type: 'SET_LOCATION_COORDS',
  payload,
});

const navigatorFailed = () => ({
  type: 'NAVIGATOR_FAILED',
});

const navigatorAbsent = () => ({
  type: 'NAVIGATOR_IS_NOT_AVAILABLE',
});

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

const getWeatherStarted = () => ({
  type: 'SET_WEATHER_STARTED',
});

const getWeatherSuccess = () => ({
  type: 'GET_WEATHER_FORECAST_SUCCESS',
});

const setCurrentWeather = weather => ({
  type: 'SET_CURRENT_WEATHER_FORECAST',
  payload: weather,
});

const getWeatherFailed = () => ({
  type: 'SET_WEATHER_FORECAST_FAILED',
});

const getForecastFailed = () => ({
  type: 'GET_FORECAST_FAILED',
});

const setBrowserLocationSuccess = () => ({
  type: 'SET_BROWSER_LOCATION_SUCCESS',
});

const getWeatherForecastByCoords = coords => (dispatch) => {
  dispatch(getForecastStarted());
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&units=metric&type=accurate&mode=json0&APPID=9bbaed744c5bf102556c1d6b1c8e1ed8`;
  axios.get(url)
    .then((results) => {
      if (results.status === 200 && results.data.cod === '200') {
        dispatch(calcForecast(results.data));
        dispatch(placeDescriptionSuccess(results.data.city.name));
        dispatch(getForecastSuccess());
      } else {
        dispatch(getForecastFailed());
      }
    })
    .catch((error) => {
      console.warn(error);
      dispatch(getForecastFailed());
    });
};

const getWeatherConditionsByCoords = coords => (dispatch) => {
  dispatch(getWeatherStarted());
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&type=accurate&units=metric&appid=a429ae35ba6d0809fa7eecb77a605911`;
  axios.get(url)
    .then((results) => {
      if (results.data.cod === 200 && results.status === 200) {
        const favorite = findCityInCookies(results.data.sys.id, results.data.sys.country);
        const output = { ...results.data, favorite };
        dispatch(setCurrentWeather(output));
        dispatch(getWeatherSuccess());
      } else {
        dispatch(getWeatherFailed());
      }
    })
    .catch((err) => {
      console.warn(err);
      dispatch(getWeatherFailed());
    });
};

export const getBrowserLocationAction = () => (dispatch) => {
  dispatch(navigatorStarted());
  if ('geolocation' in navigator) {
    let koord = {};
    navigator.geolocation.getCurrentPosition(
      (position) => {
        koord = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        dispatch(navigatorSuccess(koord));
        dispatch(getWeatherConditionsByCoords(koord));
        dispatch(getWeatherForecastByCoords(koord));
        dispatch(setBrowserLocationSuccess());
      },
      () => dispatch(navigatorFailed()),
    );
  } else {
    dispatch(navigatorAbsent());
  }
};
