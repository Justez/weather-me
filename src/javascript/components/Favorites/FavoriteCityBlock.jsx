import React from 'react';
import { connect } from 'react-redux';
import { weatherIconType, cityType, funcType } from '../../utils/types';
import { getWeatherById } from '../../redux/helpers/weatherApi';
import { getCityDetailsAction } from '../../redux/actions/placesActions';

const directions = ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW', 'North'];

class FavoriteCityBlock extends React.Component {
  constructor() {
    super();
    this.state = { weather: {} };
  }

  componentDidMount() {
    const { city: { id } } = this.props;
    const results = getWeatherById(id);
    results.then(result => this.setState({ weather: result }));
  }

  render() {
    const { city, weatherIcons, getCityDetails } = this.props;
    const { weather } = this.state;
    const handleCitySelect = () => getCityDetails(city.id);

    if (weather && weather.main) {
      return (
        <div
          className="Favorites-city background"
          onClick={handleCitySelect}
          role="menuItem"
          onKeyPress={handleCitySelect}
          tabIndex={0}
        >
          <div>
            {city.name}
          </div>
          <div className="Favorites-city-block">
            <div className="temperature">
              {Math.round(weather.main.temp)}
              &#8451;
            </div>
            <div className="weather">
              <img
                alt={weather.weather[0].description}
                name={weather.weather[0].main}
                src={weatherIcons[weather.weather[0].icon]}
              />
              <div>
                {weather.weather[0].description.charAt(0).toUpperCase()
                  + weather.weather[0].description.slice(1)}
              </div>
            </div>
          </div>
          <div className="Favorites-city-lower-block">
            {`Wind: ${directions[((Math.floor((weather.wind.deg / 45) + 0.5) % 16))]} `}
            {`${weather.wind.speed}km/h`}
          </div>
        </div>
      );
    }
    return (
      <div className="Favorites-city background">
        Loading....
      </div>
    );
  }
}

FavoriteCityBlock.propTypes = {
  weatherIcons: weatherIconType.isRequired,
  city: cityType.isRequired,
  getCityDetails: funcType.isRequired,
};

const mapStateToProps = ({ app: { weatherIcons } }) => ({ weatherIcons });

const mapDispatchToProps = dispatch => ({
  getCityDetails: href => dispatch(getCityDetailsAction(href)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCityBlock);
