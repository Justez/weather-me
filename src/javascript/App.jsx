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
  }

  render() {
    const { pageNumber, getCitySuggestions } = this.props;
    const handleClickOutside = () => {
      getCitySuggestions('');
    };

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
