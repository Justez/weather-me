/* eslint-disable no-undef */

import { connect } from 'react-redux';
import '../../../assets/stylesheets/components/Main/Map.sass';
import { weatherIconType, coordsType } from '../../utils/types';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidUpdate({ coordinates, weatherIcons, weather: { weather } }) {
    // { lat: 54.687157, lng: 25.279652 }
    if ('lat' in coordinates && window.google) {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 11,
      });

      const marker = new google.maps.InfoWindow({
        position: coordinates,
        content: `<div id="Map-content">
            <div id="siteNotice">
              notice
            </div>
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

  render() {
    const { coordinates } = this.props;
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
  weatherIcons: weatherIconType.isRequired,
};

const mapStateToProps = ({ app }) => ({
  coordinates: app.coordinates,
  weather: app.currentWeather,
  weatherIcons: app.weatherIcons,
});

export default connect(mapStateToProps)(Map);
