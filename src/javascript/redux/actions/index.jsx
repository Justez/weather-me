/* eslint-disable no-undef */
import { calcForecast } from './functions/calcForecast';

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

// const placeDescriptionStarted = () => ({
//   type: 'SET_PLACE_DESCRIPTION_STARTED',
// });

const placeDescriptionSuccess = place => ({
  type: 'SET_PLACE_DESCRIPTION',
  payload: place,
});

// const placeDescriptionFailed = () => ({
//   type: 'GET_PLACE_DESCRIPTION_FAILED',
// });

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

const addCookieStarted = () => ({
  type: 'ADD_COOKIE_STARTED',
});

const addCookieFailed = () => ({
  type: 'ADD_COOKIE_FAILED',
});

const setFavoriteCity = () => ({
  type: 'CHANGE_CITY_FAVORITE',
});

const getWeatherForecastByCoords = coords => (dispatch) => {
  dispatch(getForecastStarted());
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&units=metric&type=accurate&mode=json0&APPID=9bbaed744c5bf102556c1d6b1c8e1ed8`;
  fetch(url)
    .then(response => response.json())
    .then((results) => {
      if (results.cod === '200') {
        dispatch(calcForecast(results));
        dispatch(placeDescriptionSuccess(results.city.name));
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
  fetch(url)
    .then(response => response.json())
    .then((results) => {
      if (results.cod === 200) {
        const cookies = document.cookie && Array.isArray(JSON.parse(document.cookie))
          ? JSON.parse(document.cookie) : [];
        const favorited = cookies.find(cookie => cookie.country === results.sys.country
          && cookie.cities.find(city => city.id === results.sys.id));
        const output = { ...results, favorite: favorited ? '1' : '0' };
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

export const setCityFavoriteAction = (id, name, countryCode) => (dispatch) => {
  dispatch(addCookieStarted());
  const cookies = document.cookie ? JSON.parse(document.cookie) : [];
  if (Array.isArray(cookies)) {
    const cookie = cookies.find(coo => coo.country === countryCode)
      || { country: countryCode, cities: [] };
    cookies.splice(cookies.findIndex(coo => coo.country === countryCode), 1);
    if (cookie.cities.find(city => city.id === id)) {
      const cityArray = cookie.cities;
      cityArray.splice(cityArray.findIndex(coo => coo.id === id), 1);
      cookie.cities = cityArray;
    } else {
      cookie.cities.push({ id, name });
    }
    cookies.push(cookie);
    document.cookie = JSON.stringify(cookies);
    dispatch(setFavoriteCity());
  } else { // malformed data from outside
    dispatch(addCookieFailed());
  }
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
        // dispatch(getPlaceDescriptionByCoords(koord));
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
