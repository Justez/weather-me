// import axios from 'axios';

import {
  findCityInStorage,
  getCityStorage,
} from './functions/storageRegistry';

const changeCityFavoriteStarted = () => ({
  type: 'CHANGE_CITY_FAVORITE_STARTED',
});

export const setCityFavorite = () => ({
  type: 'CHANGE_CITY_FAVORITE',
});

const parseStorageStarted = () => ({
  type: 'PARSE_STORAGE_STARTED',
});

const parseStorageFailed = () => ({
  type: 'PARSE_STORAGE_FAILED',
});

const addCityToStorageStarted = () => ({
  type: 'ADD_CITY_TO_STORAGE_STARTED',
});

const addCityToStorageSuccess = () => ({
  type: 'ADD_CITY_TO_STORAGE_SUCCESS',
});

const removeCityFromStorageSuccess = () => ({
  type: 'REMOVE_CITY_FROM_STORAGE_SUCCESS',
});

export const changeCityFavoriteAction = (id, name, countryCode) => (dispatch) => {
  dispatch(parseStorageStarted());
  const storage = getCityStorage();
  if (storage) {
    const isInStorage = findCityInStorage(storage, id, countryCode);
    if (isInStorage) {
      dispatch(removeCityFromStorageSuccess());
    } else {
      dispatch(addCityToStorageStarted());
      // TODO: storage command

      dispatch(addCityToStorageSuccess());
    }
  } else {
    dispatch(parseStorageFailed());
  }
  dispatch(changeCityFavoriteStarted());
  // const cookies = document.cookie ? JSON.parse(document.cookie) : [];
  // if (Array.isArray(cookies)) {
  //   const cookie = cookies.find(coo => coo.country === countryCode)
  //     || { country: countryCode, cities: [] };
  //   cookies.splice(cookies.findIndex(coo => coo.country === countryCode), 1);
  //   if (cookie.cities.find(city => city.id === id)) {
  //     const cityArray = cookie.cities;
  //     cityArray.splice(cityArray.findIndex(coo => coo.id === id), 1);
  //     cookie.cities = cityArray;
  //   } else {
  //     cookie.cities.push({ id, name });
  //   }
  //   cookies.push(cookie);
  //   document.cookie = JSON.stringify(cookies);
  //   dispatch(setCityFavorite());
  // } else { // malformed data from end-user
  //   dispatch(changeCityFavoriteFailed());
  // }
};
//
// export const addCityToStorage = () => (dispatch) => {
//   const addCookie = () => console.log('cookie add', cityName);
//
//   const removeCookie = () => console.log('cookie remove', country);
//
//   try {
//     dispatch(parseStorageStarted());
//     dispatch(findCityInStorageStarted());
//     dispatch(addCityToStorageSuccess());
//     dispatch(findCityInStorageFailed());
//     addCookie();
//     dispatch(removeCityFromStorageSuccess());
//     removeCookie();
//     // ==>
//     dispatch(addCityToStorageStarted());
//   } catch (err) {
//     // cookies malformed, remove star label
//     dispatch(parseStorageFailed());
//   }
// };
//
// export const getPlaceDescriptionByCoords = coords => (dispatch) => {
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyAa2OXPttUPWWRvUJsSv4WqZHLE-h_fgjo`;
//   dispatch(placeDescriptionStarted());
//   axios(url)
//     .then((results) => {
//       if (results.status === 'OK') {
//         dispatch(placeDescriptionSuccess(results.results[0].formatted_address));
//       } else {
//         dispatch(placeDescriptionFailed());
//       }
//     })
//     .catch(() => dispatch(placeDescriptionFailed()));
// };
