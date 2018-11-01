import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import '../../assets/stylesheets/components/Map.sass';
import PropTypes from 'prop-types';
import { getLocationWeatherAction } from '../redux/actions/weatherActions';

const WeatherInfo = ({ icon, weatherIcons }) => (
  <div className="Map-info">
    <div className="Map-info-details">
      <img
        alt={icon}
        src={weatherIcons[icon]}
      />
    </div>
  </div>
);

class Map extends React.Component {
  constructor() {
    super();
    this.setCoords = this.setCoords.bind(this);
  }

  setCoords(coords) {
    const { getLocationWeather } = this.props;
    getLocationWeather(coords);
  }

  render() {
    const { coordinates, weather, weatherIcons } = this.props;

    if (coordinates.lat) {
      return (
        <div className="Map-wrapper background">
          <div className="Map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAa2OXPttUPWWRvUJsSv4WqZHLE-h_fgjo' }}
              defaultCenter={{ lat: 54.687157, lng: 25.279652 }}
              center={coordinates}
              defaultZoom={11}
              onClick={coords => this.setCoords(coords)}
            >
              <WeatherInfo
                lat={coordinates.lat}
                lng={coordinates.lng}
                icon={weather && weather.weather ? weather.weather[0].icon : ''}
                weatherIcons={weatherIcons}
              />
            </GoogleMapReact>
          </div>
        </div>
      );
    }
    return (
      <div />
    );
  }
}

Map.propTypes = {
  coordinates: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  getLocationWeather: PropTypes.func.isRequired,
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
  ).isRequired,
  weatherIcons: PropTypes.objectOf(PropTypes.string).isRequired,
};

WeatherInfo.propTypes = {
  icon: PropTypes.string,
  weatherIcons: PropTypes.objectOf(PropTypes.string),
};

WeatherInfo.defaultProps = {
  icon: '',
  weatherIcons: {},
};

const mapStateToProps = state => ({
  coordinates: state.app.coordinates,
  weather: state.app.currentWeather,
  weatherIcons: state.app.weatherIcons,
});

const mapDispatchToProps = dispatch => ({
  getLocationWeather: (coords) => {
    dispatch(getLocationWeatherAction(coords));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
