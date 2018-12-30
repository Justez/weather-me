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

const setLocationWeatherSuccess = () => ({
  type: 'SET_BROWSER_LOCATION_SUCCESS',
});

export const getLocationWeatherAction = (coords = undefined) => (dispatch) => {
  if (!coords) {
    dispatch(navigatorStarted());
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          dispatch(navigatorSuccess({ lat, lng }));
          dispatch(getWeatherConditionsByCoords({ lat, lng }));
          dispatch(getWeatherForecastByCoords({ lat, lng }));
          dispatch(setLocationWeatherSuccess());
        },
      );
    }
  } else {
    dispatch(getWeatherConditionsByCoords(coords));
    dispatch(getWeatherForecastByCoords(coords));
    dispatch(setLocationWeatherSuccess());
  }
};
