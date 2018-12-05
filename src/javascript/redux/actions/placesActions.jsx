/* eslint-disable no-underscore-dangle */
import {
  addCityToFavorites,
  findCityInStorage,
  removeCityFromFavorites,
  getCityStorage,
} from '../helpers/storageRegistry';

import { getLocationWeatherAction } from './weatherActions';

import { getCitySuggestions, getCityDetails } from '../helpers/placesApi';

const changeCityFavoriteStarted = () => ({
  type: 'CHANGE_CITY_FAVORITE_STARTED',
});

const changeCityFavoriteFailed = () => ({
  type: 'CHANGE_CITY_FAVORITE_FAILED',
});

const changeCityFavoriteSuccess = () => ({
  type: 'CHANGE_CITY_FAVORITE_SUCCESS',
});

const changeCityFavorite = () => ({
  type: 'CHANGE_CITY_FAVORITE',
});

const setFavorites = payload => ({
  type: 'SET_FAVORITES',
  payload,
});

const setSearchQuery = payload => ({
  type: 'SET_SEARCH_QUERY',
  payload,
});

const setSearchSuggestions = payload => ({
  type: 'SET_SEARCH_SUGGESTIONS',
  payload,
});

const setPlaceName = payload => ({
  type: 'SET_PLACE_DESCRIPTION',
  payload,
});

const changeCityFavoriteAction = (id, name, countryCode) => (dispatch) => {
  const isInStorage = findCityInStorage(id, countryCode);
  isInStorage
    .then((result) => {
      dispatch(changeCityFavoriteStarted());

      const response = result
        ? removeCityFromFavorites(id, countryCode) : addCityToFavorites(id, name, countryCode);
      response
        .then(() => {
          dispatch(changeCityFavorite());
          dispatch(changeCityFavoriteSuccess());
        })
        .catch(() => {
          dispatch(changeCityFavoriteFailed());
        });
    });
};

const getFavoritesAction = () => (dispatch) => {
  const storage = getCityStorage();
  dispatch(setFavorites(storage));
};

const getCitySuggestionsAction = value => (dispatch) => {
  dispatch(setSearchQuery(value));
  if (value.length > 1) {
    const response = getCitySuggestions(value);
    response
      .then((result) => {
        if (result.count) {
          const suggestions = result._embedded['city:search-results'].map(city => ({
            href: city._links['city:item'].href,
            fullName: city.matching_full_name,
          }));
          dispatch(setSearchSuggestions(suggestions));
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }
};

const getCityDetailsAction = href => (dispatch) => {
  const response = getCityDetails(href);
  response
    .then((result) => {
      dispatch(setPlaceName(result.name));
      const coords = {
        lat: result.location.latlon.latitude,
        lng: result.location.latlon.longitude,
      };
      dispatch(setSearchSuggestions([]));
      dispatch(getLocationWeatherAction(coords));
    })
    .catch((error) => {
      console.warn(error);
    });
};

export {
  changeCityFavoriteAction,
  getFavoritesAction,
  getCitySuggestionsAction,
  getCityDetailsAction,
};
