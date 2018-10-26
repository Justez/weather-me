import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/components/Map.sass';
import PropTypes from 'prop-types';

const Map = ({ coordinates }) => {
  if (coordinates.lan) {
    return (
      <div className="Forecast-block background">
        <div className="Forecast-block-timeline">
          {coordinates.lan && JSON.parse(coordinates)}
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

const mapStateToProps = state => ({
  coordinates: state.app.coordinates,
});

export default connect(mapStateToProps, undefined)(Map);
