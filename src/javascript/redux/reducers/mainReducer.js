const initialState = {
  coordinates: {},
  currentWeather: {},
  favorites: [],
  forecast: [],
  loader: true,
  mapZoom: 11,
  navigatorPresent: true,
  placeCountry: '',
  placeDescription: '',
  searchQuery: '',
  searchSuggestions: [],
  weatherIcons: {
    '01d': 'https://image.flaticon.com/icons/png/128/861/861060.png',
    '01n': 'https://image.flaticon.com/icons/png/128/1163/1163645.png',
    '02d': 'https://image.flaticon.com/icons/png/128/1200/1200427.png',
    '02n': 'https://image.flaticon.com/icons/png/128/1200/1200407.png',
    '03d': 'https://image.flaticon.com/icons/png/128/1200/1200405.png',
    '03n': 'https://image.flaticon.com/icons/png/128/1200/1200405.png',
    '04d': 'https://image.flaticon.com/icons/png/128/1200/1200427.png',
    '04n': 'https://image.flaticon.com/icons/png/128/1182/1182978.png',
    '09d': 'https://image.flaticon.com/icons/png/128/1200/1200397.png',
    '09n': 'https://image.flaticon.com/icons/png/128/1200/1200397.png',
    '10d': 'https://image.flaticon.com/icons/png/128/1200/1200431.png',
    '10n': 'https://image.flaticon.com/icons/png/128/1200/1200431.png',
    '11d': 'https://image.flaticon.com/icons/png/128/1200/1200417.png',
    '11n': 'https://image.flaticon.com/icons/png/128/1200/1200401.png',
    '13d': 'https://image.flaticon.com/icons/png/128/1200/1200428.png',
    '13n': 'https://image.flaticon.com/icons/png/128/1200/1200428.png',
    '50d': 'https://image.flaticon.com/icons/png/128/1113/1113758.png',
    '50n': 'https://image.flaticon.com/icons/png/128/1113/1113758.png',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION_COORDS':
      return {
        ...state,
        coordinates: {
          lat: action.payload.lat,
          lng: action.payload.lng,
        },
      };
    case 'SET_PLACE_DESCRIPTION':
      return {
        ...state,
        placeDescription: action.payload,
      };
    case 'SET_PLACE_COUNTRY':
      return {
        ...state,
        placeCountry: action.payload,
      };
    case 'SET_CURRENT_WEATHER_FORECAST':
      return {
        ...state,
        currentWeather: action.payload,
      };
    case 'SET_FORECAST_DAILY':
      return {
        ...state,
        forecast: action.payload,
      };
    case 'BROWSING_STARTED':
      return {
        ...state,
        loader: true,
      };
    case 'BROWSING_COMPLETED':
      return {
        ...state,
        loader: false,
      };
    case 'CHANGE_CITY_FAVORITE':
      return {
        ...state,
        currentWeather: {
          ...state.currentWeather,
          favorite: state.currentWeather.favorite === '1' ? '0' : '1',
        },
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };
    case 'SET_NAVIGATOR_DECLINED':
      return {
        ...state,
        navigatorPresent: false,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'SET_SEARCH_SUGGESTIONS':
      return {
        ...state,
        searchSuggestions: action.payload,
      };
    case 'SET_MAP_ZOOM':
      return {
        ...state,
        mapZoom: action.payload,
      };
    default:
      return state;
  }
};
