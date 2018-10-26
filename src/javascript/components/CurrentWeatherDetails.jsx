import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/components/CurrentWeatherDetails.sass';
import PropTypes from 'prop-types';

const directions = ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW'];
const getTimeFromUnix = (unix) => {
  const date = new Date(unix * 1000);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const formattedTime = `${hours}:${minutes.substr(-2)}`;
  return formattedTime;
};

const CurrentWeatherDetails = ({ weather, weatherIcons }) => {
  if (weather.main) {
    return (
      <div className="Current-weather-details background">
        <div className="Current-weather-icon">
          <img
            alt={weather.weather[0].description}
            name={weather.weather[0].main}
            src={weatherIcons[weather.weather[0].icon]}
          />
        </div>
        <div className="Current-weather-info">
          <div>
            {`Current Weather: ${weather.weather[0].main}`}
          </div>
          <div>
            {`Temperature: ${weather.main.temp}`}
            &#8451;
          </div>
          <div>
            {`Humidity: ${weather.main.humidity}%`}
          </div>
          <div>
            {`Pressure: ${weather.main.pressure}mmHg`}
          </div>
          <div>
            {`Visibility: ${weather.visibility}m`}
          </div>
          <div>
            {`Cloud cover: ${weather.clouds.all}%`}
          </div>
          <div>
            {`Wind: ${directions[((Math.floor((weather.wind.deg / 45) + 0.5) % 16))]} `}
            {`${weather.wind.speed}km/h`}
          </div>
          <div>
            {`Sunrise: ${getTimeFromUnix(1540271079)}`}
          </div>
          <div>
            {`Sunset: ${getTimeFromUnix(1540306853)}`}
          </div>
          <div>
            {`Information base: ${weather.base}`}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div />
  );
};

CurrentWeatherDetails.propTypes = {
  weather: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ])),
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]))),
    ]),
  ),
  weatherIcons: PropTypes.objectOf(PropTypes.string),
};

CurrentWeatherDetails.defaultProps = {
  weather: {},
  weatherIcons: {},
};

const mapStateToProps = state => ({
  weatherIcons: state.app.weatherIcons,
  weather: state.app.currentWeather,
});

export default connect(mapStateToProps, undefined)(CurrentWeatherDetails);
