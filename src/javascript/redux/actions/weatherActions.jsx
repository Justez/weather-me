/* eslint-disable no-undef */
import { getWeatherConditionsByCoords, getWeatherForecastByCoords } from '../helpers/weatherApi';

const browsingStarted = () => ({
  type: 'BROWSING_STARTED',
});

const navigatorSuccess = payload => ({
  type: 'SET_LOCATION_COORDS',
  payload,
});

const navigatorDeclined = () => ({
  type: 'SET_NAVIGATOR_DECLINED',
});

const setZoom = payload => ({
  type: 'SET_MAP_ZOOM',
  payload,
});

const browsingCompleted = () => ({
  type: 'BROWSING_COMPLETED',
});

export const getLocationWeatherAction = (coords = undefined) => (dispatch) => {
  if (!coords) {
    dispatch(browsingStarted());
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          dispatch(navigatorSuccess({ lat, lng }));
          dispatch(getWeatherConditionsByCoords({ lat, lng }));
          dispatch(getWeatherForecastByCoords({ lat, lng }));
          dispatch(browsingCompleted());
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            dispatch(navigatorDeclined());
          }
        },
      );
    }
  } else {
    dispatch(navigatorSuccess(coords));
    dispatch(getWeatherConditionsByCoords(coords));
    dispatch(getWeatherForecastByCoords(coords));
    dispatch(browsingCompleted());
  }
};

export const setZoomAction = (level = 11) => dispatch => dispatch(setZoom(level));
