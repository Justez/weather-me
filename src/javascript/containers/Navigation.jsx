import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/stylesheets/containers/Navigation.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCloudSun, faStar } from '@fortawesome/free-solid-svg-icons';
import { changePageAction } from '../redux/actions/pagesActions';

class Navigation extends React.Component {
  constructor() {
    super();
    this.changePage = this.changePage.bind(this);
  }

  changePage(number) {
    const { setPage } = this.props;
    setPage(number);
  }

  render() {
    const { placeDescription, pageNumber } = this.props;

    return (
      <div className="Navigation">
        <button
          className={!pageNumber ? 'active' : ''}
          onClick={() => this.changePage(0)}
          type="button"
        >
          <div className="Navigation-name">
            <FontAwesomeIcon icon={faCloudSun} />
            <h2> Me</h2>
          </div>
        </button>
        <div className="Navigation-search">
          <FontAwesomeIcon icon={faSearch} />
          <input
            id="search"
            placeholder={placeDescription || 'Search...'}
          />
        </div>
        <button
          className={pageNumber ? 'active' : ''}
          onClick={() => this.changePage(1)}
          type="button"
        >
          <div className="Navigation-favorites">
            <FontAwesomeIcon icon={faStar} />
            <div>Favorites</div>
          </div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  placeDescription: state.app.placeDescription,
  pageNumber: state.pages.number,
});

Navigation.propTypes = {
  placeDescription: PropTypes.string,
  setPage: PropTypes.func.isRequired,
  pageNumber: PropTypes.number,
};

Navigation.defaultProps = {
  placeDescription: '',
  pageNumber: 0,
};

const mapDispatchToProps = dispatch => ({
  setPage: (number) => {
    dispatch(changePageAction(number));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
