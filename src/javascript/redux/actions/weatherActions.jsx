/* eslint-disable no-undef */
import { getWeatherConditionsByCoords, getWeatherForecastByCoords } from '../helpers/weatherApi';

const navigatorStarted = () => ({
  type: 'NAVIGATOR_STARTED',
});

const navigatorSuccess = payload => ({
  type: 'SET_LOCATION_COORDS',
  payload,
});

const setZoom = payload => ({
  type: 'SET_MAP_ZOOM',
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
        },
      );
    }
    dispatch(setLocationWeatherSuccess());
  } else {
    dispatch(navigatorSuccess(coords));
    dispatch(getWeatherConditionsByCoords(coords));
    dispatch(getWeatherForecastByCoords(coords));
    dispatch(setLocationWeatherSuccess());
  }
};

export const setZoomAction = (level = 11) => dispatch => dispatch(setZoom(level));
