import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/containers/Navigation.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCloudSun, faStar } from '@fortawesome/free-solid-svg-icons';
import { changePageAction } from '../redux/actions/pagesActions';
import { getCitySuggestionsAction, getCityDetailsAction } from '../redux/actions/placesActions';
import {
  placeDescriptionType,
  pageNumberType,
  funcType,
  suggestionsType,
} from '../utils/types';

const Navigation = ({
  setPage,
  getCitySuggestions,
  placeDescription,
  pageNumber,
  getCityDetails,
  searchSuggestions,
}) => {
  const clickLink = item => getCityDetails(item.target.id);
  const changePage = number => setPage(number);
  return (
    <div>
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
            defaultValue={placeDescription}
            id="search"
            onChange={e => getCitySuggestions(e.target.value)}
            placeholder={placeDescription || 'Search...'}
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
      {searchSuggestions.length && (
        <div className="Navigation-suggestions">
          <div className="suggestions">
            {searchSuggestions.map(suggestion => (
              <div
                className="line"
                key={suggestion.href}
                id={suggestion.href}
                role="menuitem"
                onClick={clickLink}
                onKeyPress={clickLink}
                tabIndex={0}
              >
                {suggestion.fullName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  placeDescription: state.app.placeDescription,
  searchSuggestions: state.app.searchSuggestions,
  pageNumber: state.pages.number,
});

Navigation.propTypes = {
  placeDescription: placeDescriptionType,
  setPage: funcType.isRequired,
  getCitySuggestions: funcType.isRequired,
  getCityDetails: funcType.isRequired,
  pageNumber: pageNumberType,
  searchSuggestions: suggestionsType,
};

Navigation.defaultProps = {
  placeDescription: '',
  pageNumber: 0,
  searchSuggestions: [],
};

const mapDispatchToProps = dispatch => ({
  setPage: (number) => {
    dispatch(changePageAction(number));
  },
  getCitySuggestions: (value) => {
    dispatch(getCitySuggestionsAction(value));
  },
  getCityDetails: (href) => {
    dispatch(getCityDetailsAction(href));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
