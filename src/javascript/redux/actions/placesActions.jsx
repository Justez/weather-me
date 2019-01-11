/* eslint-disable no-underscore-dangle */
import {
  addCityToFavorites,
  findCityInStorage,
  removeCityFromFavorites,
  getCityStorage,
} from '../helpers/storageRegistry';
import { getLocationWeatherAction } from './weatherActions';
import { getCitySuggestions, getCityDetails } from '../helpers/placesApi';

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

const setMainPage = () => ({
  type: 'SET_PAGE_NUMBER',
  payload: 0,
});

const setSearchSuggestions = payload => ({
  type: 'SET_SEARCH_SUGGESTIONS',
  payload,
});

const setPlaceName = payload => ({
  type: 'SET_PLACE_DESCRIPTION',
  payload,
});

const setPlaceCountry = payload => ({
  type: 'SET_PLACE_COUNTRY',
  payload,
});

const changeCityFavoriteAction = (id, name, countryCode) => (dispatch) => {
  const isInStorage = findCityInStorage(id, countryCode);
  isInStorage
    .then((result) => {
      const response = result
        ? removeCityFromFavorites(id, countryCode)
        : addCityToFavorites(id, name, countryCode);
      response
        .then(() => dispatch(changeCityFavorite()));
    });
};

const getFavoritesAction = () => dispatch => dispatch(setFavorites(getCityStorage()));

const getCitySuggestionsAction = value => (dispatch) => {
  dispatch(setSearchQuery(value));
  if (value.length > 1) {
    const response = getCitySuggestions(value);
    response
      .then(({ count, _embedded }) => {
        if (count) {
          const suggestions = _embedded['city:search-results'].map(city => ({
            href: city._links['city:item'].href,
            fullName: city.matching_full_name,
          }));
          dispatch(setSearchSuggestions(suggestions));
        }
      });
  } else {
    dispatch(setSearchSuggestions([]));
  }
};

const getCityDetailsAction = href => (dispatch) => {
  const response = getCityDetails(href);
  response
    .then(({ location: { latlon }, name, _links: { 'city:country': { href: countryCodeLink } } }) => {
      const countryCode = countryCodeLink.slice(-3, -1);
      const coords = { lat: latlon.latitude, lng: latlon.longitude };
      dispatch(setMainPage());
      dispatch(getLocationWeatherAction(coords));
      dispatch(setPlaceName(name));
      dispatch(setPlaceCountry(countryCode));
      dispatch(setSearchSuggestions([]));
    });
};

export {
  changeCityFavoriteAction,
  getFavoritesAction,
  getCitySuggestionsAction,
  getCityDetailsAction,
};
