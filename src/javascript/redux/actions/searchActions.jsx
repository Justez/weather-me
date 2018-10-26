/* eslint-disable no-undef */
// import { findCityInCookies } from './functions/cookieRegistry';

const addCookieStarted = () => ({
  type: 'ADD_COOKIE_STARTED',
});

const addCookieFailed = () => ({
  type: 'ADD_COOKIE_FAILED',
});

export const setFavoriteCity = () => ({
  type: 'CHANGE_CITY_FAVORITE',
});

export const setCityFavoriteAction = (id, name, countryCode) => (dispatch) => {
  dispatch(addCookieStarted());
  const cookies = document.cookie ? JSON.parse(document.cookie) : [];
  if (Array.isArray(cookies)) {
    const cookie = cookies.find(coo => coo.country === countryCode)
      || { country: countryCode, cities: [] };
    cookies.splice(cookies.findIndex(coo => coo.country === countryCode), 1);
    if (cookie.cities.find(city => city.id === id)) {
      const cityArray = cookie.cities;
      cityArray.splice(cityArray.findIndex(coo => coo.id === id), 1);
      cookie.cities = cityArray;
    } else {
      cookie.cities.push({ id, name });
    }
    cookies.push(cookie);
    document.cookie = JSON.stringify(cookies);
    dispatch(setFavoriteCity());
  } else { // malformed data from end-user
    dispatch(addCookieFailed());
  }
};
