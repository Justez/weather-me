import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import '../../assets/stylesheets/components/Map.sass';
import PropTypes from 'prop-types';

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

const Map = ({ coordinates, weather, weatherIcons }) => {
  if (coordinates.lat) {
    return (
      <div className="Map-wrapper background">
        <div className="Map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAa2OXPttUPWWRvUJsSv4WqZHLE-h_fgjo' }}
            defaultCenter={coordinates}
            defaultZoom={11}
          >
            <WeatherInfo
              {...coordinates}
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
};

Map.propTypes = {
  coordinates: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

Map.defaultProps = {
  coordinates: {},
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

export default connect(mapStateToProps, undefined)(Map);
