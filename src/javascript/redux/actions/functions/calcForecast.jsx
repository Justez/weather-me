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

const calcForecast = (forecast = []) => (dispatch) => {
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
      rain: [],
      wind: [],
    });
    const d = new Date();
    let highestTemp = '';
    for (let i = 0; i < 5; i += 1) {
      let date = new Date(d.getTime() + (i * 24 * 60 * 60 * 1000));
      date = `${date.getFullYear()}-${String(date.getMonth() + 1).substr(-2)}-${String(date.getDate()).substr(-2)}`;

      forecast.list.forEach((item) => {
        if (item.dt_txt.includes(date)) {
          result[i] = {
            ...result[i],
            cloudy: [...result[i].cloudy, item.clouds.all],
            pressure: [...result[i].pressure, item.main.pressure],
            rain: [
              ...result[i].rain,
              item.rain && item.rain['3h']
                ? item.rain['3h']
                : undefined,
            ],
            tempMax:
              result[i].tempMax < item.main.temp_max
                ? item.main.temp_max
                : result[i].tempMax,
            tempMin:
              result[i].tempMin > item.main.temp_min || !result[i].tempMin
                ? item.main.temp_min
                : result[i].tempMin,
            wind:
              result[i].wind < item.wind.speed || !result[i].wind
                ? item.wind.speed
                : result[i].wind,
          };
        }
      });

      const times = result[i].cloudy.length;
      highestTemp = result[i].tempMax > highestTemp ? result[i].tempMax : highestTemp;

      result[i] = {
        ...result[i],
        cloudy:
          Math.round(result[i].cloudy.reduce((a, b) => (a + b)) / result[i].cloudy.length),
        pressure:
          Math.round(result[i].pressure.reduce((a, b) => (a + b)) / result[i].pressure.length),
        tempMax: Math.round(result[i].tempMax),
        tempMin: Math.round(result[i].tempMin),
        wind: Math.round(result[i].wind),
        rain: result[i].rain
          .filter(item => item)
          .reduce((a, b) => (a + b)) / result[i].rain.filter(item => item).length,
        date,
      };

      let weatherIcon = '01';
      let weatherDescription = 'Sunny';

      if (result[i].rain < 0.1 && result[i].pressure > 1000) {
        if (result[i].cloudy < 40) {
          weatherIcon = '02';
          weatherDescription = 'Few clouds';
        } else if (result[i].cloudy < 80) {
          weatherIcon = '03';
          weatherDescription = 'Scattered clouds';
        } else {
          weatherIcon = '04';
          weatherDescription = 'Broken clouds';
        }
      } else if (result[i].pressure < 1000) {
        if (result[i].rain <= 1.5) {
          weatherIcon = '10';
          weatherDescription = 'Rain';
        } else {
          weatherIcon = '09';
          weatherDescription = 'Shower rain';
        }
        if (result[i].minTemp < 0) {
          weatherIcon = '13';
          weatherDescription = '';
        }
      }

      weatherIcon += times < 3 ? 'n' : 'd';

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
