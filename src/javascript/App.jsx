/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../assets/stylesheets/containers/App.sass';
import Navigation from './containers/Navigation';
import Main from './containers/Main';
import Favorites from './containers/Favorites';
import { getLocationWeatherAction } from './redux/actions/weatherActions';

class App extends React.Component {
  componentDidMount() {
    const { getBrowserLocation } = this.props;
    getBrowserLocation();
  }

  render() {
    const { pageNumber } = this.props;

    return (
      <div className="App">
        <Navigation />
        {pageNumber
          ? <Favorites />
          : <Main />
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBrowserLocation: () => {
    dispatch(getLocationWeatherAction());
  },
});

App.propTypes = {
  getBrowserLocation: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

const mapStateToProps = ({ pages: { number: pageNumber } }) => ({
  pageNumber,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
