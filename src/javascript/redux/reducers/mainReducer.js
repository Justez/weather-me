const initialState = {
  coordinates: {},
  forecast: [],
  loader: false,
  placeDescription: '',
  weatherIcons: {
    // clear sky
    '01d': 'https://image.flaticon.com/icons/png/128/861/861060.png',
    '01n': 'https://image.flaticon.com/icons/png/128/1163/1163645.png',
    // few clouds
    '02d': 'https://image.flaticon.com/icons/png/128/1200/1200427.png',
    '02n': 'https://image.flaticon.com/icons/png/128/1200/1200407.png',
    // scattered clouds
    '03d': 'https://image.flaticon.com/icons/png/128/1200/1200405.png',
    '03n': 'https://image.flaticon.com/icons/png/128/1200/1200405.png',
    // broken clouds
    '04d': 'https://image.flaticon.com/icons/png/128/1200/1200427.png',
    '04n': 'https://image.flaticon.com/icons/png/128/1182/1182978.png',
    // shower rain
    '09d': 'https://image.flaticon.com/icons/png/128/1200/1200397.png',
    '09n': 'https://image.flaticon.com/icons/png/128/1200/1200397.png',
    // rain
    '10d': 'https://image.flaticon.com/icons/png/128/1200/1200431.png',
    '10n': 'https://image.flaticon.com/icons/png/128/1200/1200431.png',
    // thunderstorm
    '11d': 'https://image.flaticon.com/icons/png/128/1200/1200417.png',
    '11n': 'https://image.flaticon.com/icons/png/128/1200/1200401.png',
    // snow
    '13d': 'https://image.flaticon.com/icons/png/128/1200/1200428.png',
    '13n': 'https://image.flaticon.com/icons/png/128/1200/1200428.png',
    // mist
    '50d': 'https://image.flaticon.com/icons/png/128/1113/1113758.png',
    '50n': 'https://image.flaticon.com/icons/png/128/1113/1113758.png',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION_COORDS':
      return {
        ...state,
        coordinates: action.payload,
      };
    case 'SET_PLACE_DESCRIPTION':
      return {
        ...state,
        placeDescription: action.payload,
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
    case ('NAVIGATOR_STARTED' || 'SET_WEATHER_FORECAST_STARTED'):
      return {
        ...state,
        loader: true,
      };
    case 'SET_BROWSER_LOCATION_SUCCESS':
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
    default:
      return state;
  }
};
