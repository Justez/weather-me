/* eslint-disable no-undef */

export const getCityStorage = () => {
  try {
    return document.cookie
      ? Array.isArray(JSON.parse(document.cookie))
        && JSON.parse(document.cookie)
      : [];
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

export const isCityFavoriteInStorage = async (cityCode, country) => {
  const storage = await getCityStorage();
  const favorited = storage.find(cookie => cookie.country === country
    && cookie.cities.find(city => city.id === cityCode)) ? '1' : '0';
  return favorited;
};

// export const addCityToStorage = async (cityCode, name, countryCode) => {
//
// }

export const findCityInStorage = (cityStorage, id, countryCode) => {
  const country = cityStorage.find(coo => coo.country === countryCode);
  if (country.cities) {
    return country.cities.find(city => city.id === id);
  }
  return '0';
};
