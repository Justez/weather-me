import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/components/Map.sass';
import PropTypes from 'prop-types';

const Map = ({ coordinates }) => {
  if (coordinates.lat) {
    return (
      <div className="Map-wrapper background">
        <div className="Map">
          {coordinates.lat && JSON.stringify(coordinates)}
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
