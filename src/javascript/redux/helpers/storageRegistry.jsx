/* eslint-disable no-undef */

export const getCityStorage = () => {
  try {
    return document.cookie
      ? Array.isArray(JSON.parse(document.cookie))
        && JSON.parse(document.cookie)
      : [];
  } catch (err) {
    return undefined;
  }
};

const setCityStorage = (storage) => {
  document.cookie = JSON.stringify(storage);
};

const getCountry = async (countryCode) => {
  const storage = await getCityStorage();
  const countryDescr = storage.find(({ country }) => country === countryCode);
  return countryDescr;
};

export const isCityFavoriteInStorage = async (cityCode, country) => {
  const storage = await getCityStorage();
  const favorited = storage.find(cookie => cookie.country === country
      && cookie.cities.find(({ id }) => id === cityCode)) ? '1' : '0';
  return favorited;
};

export const findCityInStorage = async (id, countryCode) => {
  const country = await getCountry(countryCode);
  return country && country.cities ? country.cities.find(city => city.id === id) : 0;
};

const updateCountry = async (countryDetails, countryCode) => {
  let storage = await getCityStorage();
  const index = storage.findIndex(({ country }) => country === countryCode);
  if (countryDetails && countryDetails.cities && countryDetails.cities.length) {
    if (index) {
      storage.push(countryDetails);
    } else {
      storage[index] = countryDetails;
    }
  } else {
    storage = storage.filter(({ country }) => country !== countryCode);
  }
  await setCityStorage(storage);
};

export const addCityToFavorites = async (id, name, countryCode) => {
  const country = await getCountry(countryCode);

  let payload = {};
  if (country && country.cities) {
    if (!country.cities.find(city => city.id === id)) {
      payload = country.cities;
      payload.push({ id, name });
      payload = { ...country, cities: payload };
    }
  } else {
    payload = { country: countryCode, cities: [{ id, name }] };
  }
  updateCountry(payload, countryCode);
};

export const removeCityFromFavorites = async (id, countryCode) => {
  let country = await getCountry(countryCode);
  if (country.cities) {
    const cities = country.cities.filter(city => city.id !== id);
    country = { ...country, cities };
  }
  updateCountry(country, countryCode);
};
