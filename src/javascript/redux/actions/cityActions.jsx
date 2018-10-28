import {
  addCityToFavorites,
  findCityInStorage,
  removeCityFromFavorites,
} from './functions/storageRegistry';

const changeCityFavoriteStarted = () => ({
  type: 'CHANGE_CITY_FAVORITE_STARTED',
});

const changeCityFavoriteFailed = () => ({
  type: 'CHANGE_CITY_FAVORITE_FAILED',
});

const changeCityFavoriteSuccess = () => ({
  type: 'CHANGE_CITY_FAVORITE_SUCCESS',
});

export const changeCityFavorite = () => ({
  type: 'CHANGE_CITY_FAVORITE',
});

export const changeCityFavoriteAction = (id, name, countryCode) => (dispatch) => {
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
