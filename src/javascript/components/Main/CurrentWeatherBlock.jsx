/* eslint-disable no-undef */
import { connect } from 'react-redux';
import '../../../assets/stylesheets/components/Main/CurrentWeatherBlock.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { changeCityFavoriteAction } from '../../redux/actions/placesActions';

import {
  weatherType,
  weatherIconType,
  funcType,
  stringType,
} from '../../utils/types';

const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const directions = ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW', 'North'];
const today = new Date();

const CurrentWeatherBlock = ({
  changeCityFavorite,
  placeCountry,
  weather,
  weatherIcons,
}) => {
  if (weather.main) {
    return (
      <div className="Current-weather background">
        <div>
          {weather.name}
          <FontAwesomeIcon
            className={`${+weather.favorite ? 'favorite' : ''}`}
            icon={faStar}
            onClick={() => changeCityFavorite(weather.id, weather.name, placeCountry)}
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
              {Math.round(weather.main.temp)}
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
            {`Max: ${Math.round(weather.main.temp_max)}`}
            &#8451;
            {`. Min: ${Math.round(weather.main.temp_min)}`}
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
  placeCountry: stringType.isRequired,
};

const mapDispatchToProps = dispatch => ({
  changeCityFavorite: (id, name, countryCode) => {
    dispatch(changeCityFavoriteAction(id, name, countryCode));
  },
});

const mapStateToProps = ({ app }) => ({
  weatherIcons: app.weatherIcons,
  weather: app.currentWeather,
  placeCountry: app.placeCountry,
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeatherBlock);
