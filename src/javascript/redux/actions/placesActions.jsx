import {
  addCityToFavorites,
  findCityInStorage,
  removeCityFromFavorites,
  getCityStorage,
} from '../helpers/storageRegistry';

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

export {
  changeCityFavoriteAction,
  getFavoritesAction,
};
