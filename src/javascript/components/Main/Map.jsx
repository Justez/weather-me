/* eslint-disable no-undef */

import { connect } from 'react-redux';
import '../../../assets/stylesheets/components/Main/Map.sass';
import {
  coordsType,
  funcType,
  weatherIconType,
  weatherType,
} from '../../utils/types';
import { getLocationWeatherAction } from '../../redux/actions/weatherActions';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  render() {
    const {
      coordinates,
      weatherIcons,
      weather: { weather },
      getLocationWeather,
    } = this.props;

    if (coordinates.lat && window.google) {
      if (this.map) {
        google.maps.event.clearInstanceListeners(this.map);
      }

      if (document.getElementById('map')) {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: coordinates,
          zoom: 9,
        });

        google.maps.event.addListener(this.map, 'click', (event) => {
          getLocationWeather({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        });

        if (weather) {
          const marker = new google.maps.InfoWindow({
            position: coordinates,
            content: `<div id="Map-content">
            <div id="bodyContent">
            <img
            alt="${weather ? weather[0].icon : ''}"
            src="${weatherIcons[weather ? weather[0].icon : '']}"
            />
            </div>
            </div>`,
          });

          marker.setMap(this.map);
        }
      }
    }

    if (coordinates.lat) {
      return (
        <div className="Map-wrapper background">
          <div className="Map" id="map" />
        </div>
      );
    }
    return (
      <div />
    );
  }
}

Map.propTypes = {
  coordinates: coordsType.isRequired,
  weather: weatherType.isRequired,
  weatherIcons: weatherIconType.isRequired,
  getLocationWeather: funcType.isRequired,
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
