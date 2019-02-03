/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/containers/Navigation.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCloudSun,
  faStar,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { changePageAction } from '../redux/actions/pagesActions';
import { getCitySuggestionsAction, getCityDetailsAction } from '../redux/actions/placesActions';
import { getLocationWeatherAction } from '../redux/actions/weatherActions';
import {
  loaderType,
  placeDescriptionType,
  pageNumberType,
  funcType,
  suggestionsType,
} from '../utils/types';

class Navigation extends React.Component {
  componentDidUpdate({ placeDescription: oldName }) {
    const { placeDescription } = this.props;
    if (placeDescription !== oldName) {
      document.getElementById('search').value = placeDescription;
    }
  }

  render() {
    const {
      loader,
      navigatorPresent,
      setPage,
      getBrowserLocation,
      getCitySuggestions,
      placeDescription,
      pageNumber,
      getCityDetails,
      searchSuggestions,
    } = this.props;

    const clickLink = ({ target: { id } }) => getCityDetails(id);

    const changePage = number => setPage(number);

    const handleKeyPress = e => (e.key === 'Enter' || e.key === 'Escape')
      && searchSuggestions.length
      && getCityDetails(searchSuggestions[0].href);

    return (
      <div>
        <div className="Navigation">
          <button
            className={pageNumber ? '' : 'background'}
            onClick={() => changePage(0)}
            type="button"
          >
            <div className="Navigation-name">
              <FontAwesomeIcon icon={faCloudSun} />
              <h2> Me</h2>
            </div>
          </button>
          <div className="Navigation-search">
            <FontAwesomeIcon className="search" icon={faSearch} />
            <input
              defaultValue={placeDescription}
              id="search"
              placeholder={placeDescription || 'Search...'}
              onChange={({ target: { value } }) => getCitySuggestions(value)}
              onKeyUp={handleKeyPress}
              type="search"
            />
            {navigatorPresent
              && pageNumber === 0
              && <FontAwesomeIcon className="marker" onClick={!loader ? getBrowserLocation : undefined} icon={faMapMarkerAlt} />
            }
          </div>
          <button
            className={pageNumber ? 'background' : ''}
            onClick={() => changePage(1)}
            type="button"
          >
            <div className="Navigation-favorites">
              <FontAwesomeIcon icon={faStar} />
              <div>Favorites</div>
            </div>
          </button>
        </div>
        {searchSuggestions.length > 0 && (navigatorPresent ? !loader : true) && (
          <div className="Navigation-suggestions">
            <div className="suggestions">
              {searchSuggestions.map(({ href, fullName }) => (
                <div
                  className="line"
                  key={href}
                  id={href}
                  role="menuitem"
                  onClick={clickLink}
                  onKeyPress={clickLink}
                  tabIndex={0}
                >
                  {fullName}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ app, pages }) => ({
  loader: app.loader,
  navigatorPresent: app.navigatorPresent,
  placeDescription: app.placeDescription,
  searchSuggestions: app.searchSuggestions,
  pageNumber: pages.number,
});

Navigation.propTypes = {
  loader: loaderType.isRequired,
  navigatorPresent: loaderType.isRequired,
  placeDescription: placeDescriptionType,
  setPage: funcType.isRequired,
  getBrowserLocation: funcType.isRequired,
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
  setPage: number => dispatch(changePageAction(number)),
  getBrowserLocation: () => dispatch(getLocationWeatherAction()),
  getCitySuggestions: value => dispatch(getCitySuggestionsAction(value)),
  getCityDetails: href => dispatch(getCityDetailsAction(href)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
