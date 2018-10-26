/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../assets/stylesheets/containers/App.sass';
import Navigation from './containers/Navigation';
import Main from './containers/Main';
import { getBrowserLocationAction } from './redux/actions';

class App extends React.Component {
  componentDidMount() {
    const { getBrowserLocation } = this.props;
    getBrowserLocation();
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Main />

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBrowserLocation: () => {
    dispatch(getBrowserLocationAction());
  },
});

App.propTypes = {
  getBrowserLocation: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(App);
