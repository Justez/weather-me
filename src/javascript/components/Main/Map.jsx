/* eslint-disable no-undef */
import { connect } from 'react-redux';
import '../../../assets/stylesheets/components/Main/Map.sass';
import {
  coordsType,
  funcType,
  numberType,
  weatherIconType,
  weatherType,
} from '../../utils/types';
import { getLocationWeatherAction, setZoomAction } from '../../redux/actions/weatherActions';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  shouldComponentUpdate(next) {
    const { coordinates, weather } = this.props;
    if (next.weather.name !== weather.name) return true;
    if (next.coordinates.lat && !coordinates.lat) return true;
    return false;
  }

  render() {
    const {
      coordinates,
      mapZoom,
      weatherIcons,
      weather: { weather, main },
      getLocationWeather,
      setZoom,
    } = this.props;

    if (coordinates.lat && window.google) {
      if (this.map) {
        google.maps.event.clearInstanceListeners(this.map);
      }

      if (document.getElementById('map')) {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: coordinates,
          zoom: mapZoom,
        });

        google.maps.event.addListener(this.map, 'click', (event) => {
          getLocationWeather({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        });

        google.maps.event.addListener(this.map, 'zoom_changed', () => {
          setZoom(this.map.getZoom());
        });

        if (weather) {
          const marker = new google.maps.InfoWindow({
            position: coordinates,
            content: `<div id="Map-content bodyContent">
              <span className="Map-content-icon">
                <img
                  alt="${weather ? weather[0].icon : ''}"
                  src="${weather ? weatherIcons[weather[0].icon] : ''}"
                />
              </span>
              ${main ? `
                <span>
                  ${Math.round(main.temp)}
                  &#8451;
                </span>` : ''}
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
  mapZoom: numberType.isRequired,
  weather: weatherType.isRequired,
  weatherIcons: weatherIconType.isRequired,
  getLocationWeather: funcType.isRequired,
  setZoom: funcType.isRequired,
};

const mapStateToProps = ({ app }) => ({
  coordinates: app.coordinates,
  mapZoom: app.mapZoom,
  weather: app.currentWeather,
  weatherIcons: app.weatherIcons,
});

const mapDispatchToProps = dispatch => ({
  getLocationWeather: coords => dispatch(getLocationWeatherAction(coords)),
  setZoom: level => dispatch(setZoomAction(level)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
