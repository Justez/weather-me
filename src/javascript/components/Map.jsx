import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/components/Map.sass';
import PropTypes from 'prop-types';

const Map = ({ coordinates }) => (
  <div className="Forecast-block background">
    <div className="Forecast-block-timeline">
      {+coordinates && JSON.parse(coordinates)}
    </div>
  </div>
);

Map.propTypes = {
  coordinates: PropTypes.objectOf(PropTypes.string),
};

Map.defaultProps = {
  coordinates: {},
};

const mapStateToProps = state => ({
  coordinates: state.app.coordinates,
});

export default connect(mapStateToProps, undefined)(Map);
