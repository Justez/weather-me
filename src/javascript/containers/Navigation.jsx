import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/containers/Navigation.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCloudSun, faStar } from '@fortawesome/free-solid-svg-icons';
import { changePageAction } from '../redux/actions/pagesActions';
import { placeDescriptionType, pageNumberType, funcType } from '../utils/types';

const Navigation = ({ setPage, placeDescription, pageNumber }) => {
  const changePage = number => setPage(number);

  return (
    <div className="Navigation">
      <button
        className={!pageNumber ? 'active' : ''}
        onClick={() => changePage(0)}
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
          defaultValue={placeDescription}
        />
      </div>
      <button
        className={pageNumber ? 'active' : ''}
        onClick={() => changePage(1)}
        type="button"
      >
        <div className="Navigation-favorites">
          <FontAwesomeIcon icon={faStar} />
          <div>Favorites</div>
        </div>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  placeDescription: state.app.placeDescription,
  pageNumber: state.pages.number,
});

Navigation.propTypes = {
  placeDescription: placeDescriptionType,
  setPage: funcType.isRequired,
  pageNumber: pageNumberType,
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
