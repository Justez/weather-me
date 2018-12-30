import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import '../../../assets/stylesheets/components/Main/Map.sass';
import { getLocationWeatherAction } from '../../redux/actions/weatherActions';
import {
  weatherType,
  weatherIconType,
  coordsType,
  funcType,
  iconType,
} from '../../utils/types';

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

const Map = ({
  coordinates,
  weather: { weather },
  weatherIcons,
  getLocationWeather,
}) => {
  const setCoords = coords => getLocationWeather(coords);

  if (coordinates.lat) {
    return (
      <div className="Map-wrapper background">
        <div className="Map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAa2OXPttUPWWRvUJsSv4WqZHLE-h_fgjo' }}
            defaultCenter={{ lat: 54.687157, lng: 25.279652 }}
            center={coordinates}
            defaultZoom={11}
            onClick={coords => setCoords(coords)}
          >
            <WeatherInfo
              lat={coordinates.lat}
              lng={coordinates.lng}
              icon={weather ? weather[0].icon : ''}
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
  coordinates: coordsType.isRequired,
  getLocationWeather: funcType.isRequired,
  weather: weatherType.isRequired,
  weatherIcons: weatherIconType.isRequired,
};

WeatherInfo.propTypes = {
  icon: iconType.isRequired,
  weatherIcons: weatherIconType.isRequired,
};

const mapStateToProps = ({ app }) => ({
  coordinates: app.coordinates,
  weather: app.currentWeather,
  weatherIcons: app.weatherIcons,
});

const mapDispatchToProps = dispatch => ({
  getLocationWeather: coords => dispatch(getLocationWeatherAction(coords)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
