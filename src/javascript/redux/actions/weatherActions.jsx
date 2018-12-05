/* eslint-disable no-undef */
import { getWeatherConditionsByCoords, getWeatherForecastByCoords } from '../helpers/weatherApi';

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

const setLocationWeatherSuccess = () => ({
  type: 'SET_BROWSER_LOCATION_SUCCESS',
});

export const getLocationWeatherAction = (coords = undefined) => (dispatch) => {
  if (!coords) {
    let koord;
    dispatch(navigatorStarted());
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          koord = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch(navigatorSuccess(koord));
          dispatch(getWeatherConditionsByCoords(koord));
          dispatch(getWeatherForecastByCoords(koord));
          dispatch(setLocationWeatherSuccess());
        },
        () => dispatch(navigatorFailed()),
      );
    } else {
      dispatch(navigatorAbsent());
    }
  } else {
    dispatch(navigatorSuccess(coords));
    dispatch(getWeatherConditionsByCoords(coords));
    dispatch(getWeatherForecastByCoords(coords));
    dispatch(setLocationWeatherSuccess());
  }
};
