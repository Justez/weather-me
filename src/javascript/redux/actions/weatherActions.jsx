/* eslint-disable no-undef */
import axios from 'axios';
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
        () => {
          const url = 'http://www.geoplugin.net/json.gp?jsoncallback=?';
          axios.get(url)
            .then(({ data, status }) => {
              if (status === 200) {
                const str = JSON.parse(`{${
                  data.substring(data.indexOf('geoplugin_latitude') - 1, data.indexOf('geoplugin_locationAccuracy') - 5)
                }}`);
                const latLan = {
                  lat: Number(str.geoplugin_latitude),
                  lng: Number(str.geoplugin_longitude),
                };
                dispatch(navigatorSuccess(latLan));
                dispatch(getWeatherConditionsByCoords(latLan));
                dispatch(getWeatherForecastByCoords(latLan));
                dispatch(browsingCompleted());
              }
            })
            .catch(() => {
              dispatch(navigatorDeclined());
            });
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
