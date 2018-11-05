import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/components/CurrentWeatherBlock.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { weatherType, weatherIconType, funcType } from '../utils/types';
import { changeCityFavoriteAction } from '../redux/actions/placesActions';

const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const directions = ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW', 'North'];
const today = new Date();

const CurrentWeatherBlock = ({ weather, weatherIcons, changeCityFavorite }) => {
  if (weather.main) {
    return (
      <div className="Current-weather background">
        <div>
          {weather.name}
          <FontAwesomeIcon
            className={`${weather.favorite === '1' ? 'favorite' : ''}`}
            icon={faStar}
            onClick={() => changeCityFavorite(weather.id, weather.name, 'LT')}
          />
        </div>
        <div className="Current-weather-block">
          <span className="time">
            {dayList[today.getDay()]}
            <div>
              {today.getHours()}
              :
              {`0${today.getMinutes()}`.slice(-2)}
            </div>
          </span>
          <span className="temperature">
            <div className="number">
              {weather.main.temp}
            </div>
            <div className="sign">
              &#8451;
            </div>
          </span>
          <span className="weather">
            <img
              alt={weather.weather[0].description}
              name={weather.weather[0].main}
              src={weatherIcons[weather.weather[0].icon]}
            />
            <div>
              {weather.weather[0].description.charAt(0).toUpperCase()
                + weather.weather[0].description.slice(1)}
            </div>
          </span>
        </div>
        <div className="Current-weather-lower-block">
          <div>
            {`Max: ${weather.main.temp_max}`}
            &#8451;
            {`. Min: ${weather.main.temp_min}`}
            &#8451;
          </div>
          <div>
            {`Wind: ${directions[((Math.floor((weather.wind.deg / 45) + 0.5) % 16))]} `}
            {`${weather.wind.speed}km/h`}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div />
  );
};

CurrentWeatherBlock.propTypes = {
  changeCityFavorite: funcType.isRequired,
  weather: weatherType.isRequired,
  weatherIcons: weatherIconType.isRequired,
};

const mapDispatchToProps = dispatch => ({
  changeCityFavorite: (id, name, countryCode) => {
    dispatch(changeCityFavoriteAction(id, name, countryCode));
  },
});

const mapStateToProps = state => ({
  weatherIcons: state.app.weatherIcons,
  weather: state.app.currentWeather,
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeatherBlock);
