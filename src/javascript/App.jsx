/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../assets/stylesheets/containers/App.sass';
import Navigation from './containers/Navigation';
import Main from './containers/Main';
import Favorites from './containers/Favorites';
import { getLocationWeatherAction } from './redux/actions/weatherActions';
import { getCitySuggestionsAction } from './redux/actions/placesActions';

class App extends React.Component {
  componentDidMount() {
    const { getBrowserLocation } = this.props;
    getBrowserLocation();

    if (!(window.google && window.google.maps)) {
      const script = document.createElement('script');
      const API = 'AIzaSyDbAz1XXxDoKSU2nZXec89rcHPxgkvVoiw';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
      script.async = true;
      document.body.appendChild(script);
    }
  }

  componentDidUpdate({ pageNumber: prevPageNumber }) {
    const { pageNumber } = this.props;
    if (prevPageNumber !== pageNumber) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  render() {
    const { pageNumber, getCitySuggestions } = this.props;
    const handleClickOutside = () => getCitySuggestions('');

    return (
      <div className="App">
        <Navigation />
        <div
          onClick={handleClickOutside}
          onKeyPress={handleClickOutside}
          role="textbox"
          tabIndex={0}
        >
          {pageNumber
            ? <Favorites />
            : <Main />
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBrowserLocation: () => dispatch(getLocationWeatherAction()),
  getCitySuggestions: query => dispatch(getCitySuggestionsAction(query)),
});

App.propTypes = {
  getBrowserLocation: PropTypes.func.isRequired,
  getCitySuggestions: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

const mapStateToProps = ({ pages: { number: pageNumber } }) => ({
  pageNumber,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
