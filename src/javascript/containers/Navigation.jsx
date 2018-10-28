import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/stylesheets/containers/Navigation.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCloudSun, faStar } from '@fortawesome/free-solid-svg-icons';

class Navigation extends React.Component {
  componentDidMount() {

  }

  render() {
    const { placeDescription } = this.props;

    return (
      <div className="Navigation">
        <div className="Navigation-name">
          <FontAwesomeIcon icon={faCloudSun} />
          <h2> Me</h2>
        </div>
        <div className="Navigation-search">
          <FontAwesomeIcon icon={faSearch} />
          <input
            id="search"
            placeholder={placeDescription || 'Search...'}
          />
        </div>
        <div className="Navigation-favorites">
          <FontAwesomeIcon icon={faStar} />
          <div>Favorites</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  placeDescription: state.app.placeDescription,
});

Navigation.propTypes = {
  placeDescription: PropTypes.string,
};

Navigation.defaultProps = {
  placeDescription: '',
};

export default connect(mapStateToProps, undefined)(Navigation);
