import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/components/FavoriteCountryBlock.sass';
import { weatherIconType, cityType } from '../utils/types';
import { getWeatherById } from '../redux/actions/utils/weatherApi';

const directions = ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW', 'North'];

class FavoriteCityBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: {},
    };
  }

  componentDidMount() {
    const { city } = this.props;
    const results = getWeatherById(city.id);
    results.then(result => this.setState({ weather: result }));
  }

  render() {
    const { city, weatherIcons } = this.props;
    const { weather } = this.state;

    if (weather.main) {
      return (
        <div className="Favorites-city background">
          <div>
            {city.name}
          </div>
          <div className="Favorites-city-block">
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
          <div className="Favorites-city-lower-block">
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
  }
}

FavoriteCityBlock.propTypes = {
  weatherIcons: weatherIconType.isRequired,
  city: cityType.isRequired,
};

const mapStateToProps = state => ({
  weatherIcons: state.app.weatherIcons,
});

export default connect(mapStateToProps)(FavoriteCityBlock);
