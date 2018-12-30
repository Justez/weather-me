const calcForecastDetailsStarted = () => ({
  type: 'CALC_FORECAST_DAILY_STARTED',
});

const calcForecastDetailsSuccess = () => ({
  type: 'CALC_FORECAST_DAILY_SUCCESS',
});

const setForecastDaily = forecast => ({
  type: 'SET_FORECAST_DAILY',
  payload: forecast,
});

const calcForecastDetailsFailed = () => ({
  type: 'CALC_FORECAST_DAILY_FAILED',
});

const calcForecast = ({ list = [] }) => (dispatch) => {
  try {
    dispatch(calcForecastDetailsStarted());
    const result = Array(5).fill({
      weatherIcon: '',
      weatherDescription: '',
      cloudy: [],
      pressure: [],
      tempMax: '',
      highestTemp: '',
      tempMin: '',
      date: '',
      rain: { mm: 0, times: 0 },
      wind: [],
    });
    const d = new Date();
    let highestTemp = '';

    for (let i = 0; i < 5; i += 1) {
      let date = new Date(d.getTime() + (i * 24 * 60 * 60 * 1000));
      date = `${date.getFullYear()}-${`0${String(date.getMonth() + 1)}`.substr(-2)}-${`0${String(date.getDate())}`.substr(-2)}`;
      list.forEach((item) => {
        if (item.dt_txt.includes(date)) {
          const hour = item.dt_txt.slice(-8, -6);
          result[i] = {
            ...result[i],
            cloudy: [...result[i].cloudy, item.clouds.all],
            pressure: [...result[i].pressure, item.main.pressure],
            rain: item.rain && item.rain['3h'] && hour > 3 && hour < 21
              ? {
                times: result[i].rain.times + 1,
                mm: Math.max(result[i].rain.mm, item.rain['3h']),
              } : result[i].rain,
            tempMax: Math.max(result[i].tempMax, item.main.temp_max),
            tempMin: Math.min(result[i].tempMin || item.main.temp_min, item.main.temp_min),
            wind: result[i].wind < item.wind.speed || !result[i].wind
              ? item.wind.speed
              : result[i].wind,
          };
        }
      });

      highestTemp = Math.max(result[i].tempMax, highestTemp);

      result[i] = {
        ...result[i],
        cloudy:
          Math.round(result[i].cloudy.reduce((a, b) => (a + b)) / result[i].cloudy.length),
        pressure:
          Math.round(result[i].pressure.reduce((a, b) => (a + b)) / result[i].pressure.length),
        tempMax: Math.round(result[i].tempMax),
        tempMin: Math.round(result[i].tempMin),
        wind: Math.round(result[i].wind),
        date,
      };

      let weatherIcon = '01d';
      let weatherDescription = 'Sunny';

      if (result[i].rain.mm < 0.5 && result[i].rain.times < 2) {
        if (result[i].cloudy < 40) {
          weatherIcon = '02d';
          weatherDescription = 'Few clouds';
        } else if (result[i].cloudy < 80) {
          weatherIcon = '03d';
          weatherDescription = 'Scattered clouds';
        } else {
          weatherIcon = '04d';
          weatherDescription = 'Broken clouds';
        }
      } else if (result[i].rain.mm <= 1.2 && result[i].rain.times <= 3) {
        if (result[i].cloudy < 80) {
          weatherIcon = '03d';
          weatherDescription = 'Scattered clouds';
        } else {
          weatherIcon = '10d';
          weatherDescription = 'Rain';
        }
      } else if (result[i].rain.mm > 2 && result[i].rain.times > 3) {
        weatherIcon = '09d';
        weatherDescription = 'Shower rain';
      } else if (result[i].rain.mm > 1 && result[i].rain.times > 3) {
        weatherIcon = '10d';
        weatherDescription = 'Rain';
      }

      result[i] = {
        ...result[i],
        weatherIcon,
        weatherDescription,
      };
    }

    result.forEach((item, index) => {
      result[index] = {
        ...item,
        highestTemp: Math.round(highestTemp),
      };
    });

    dispatch(setForecastDaily(result));
    dispatch(calcForecastDetailsSuccess());
  } catch (err) {
    dispatch(calcForecastDetailsFailed());
  }
};

export {
  calcForecast,
  setForecastDaily,
};
