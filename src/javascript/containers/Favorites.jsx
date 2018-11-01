import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/stylesheets/containers/Favorites.sass';
import CurrentWeatherBlock from '../components/CurrentWeatherBlock';
import { getFavoritesWeatherAction } from '../redux/actions/weatherActions';

class Favorites extends React.Component {
  componentDidMount() {
    const { getFavoritesWeather } = this.props;
    getFavoritesWeather();
  }

  render() {
    const { loader/* , favoritesWeather */ } = this.props;

    if (loader) {
      return (
        <div className="loading">
          Loading...
        </div>
      );
    }

    return (
      <div className="Favorites">
        <div className="Favorites-content">
          <CurrentWeatherBlock />
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  // favoritesWeather: PropTypes.arrayOf(PropTypes.objectOf(
  //   PropTypes.oneOfType([
  //     PropTypes.objectOf(PropTypes.oneOfType([
  //       PropTypes.number,
  //       PropTypes.string,
  //     ])),
  //     PropTypes.number,
  //     PropTypes.string,
  //     PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
  //       PropTypes.number,
  //       PropTypes.string,
  //     ]))),
  //   ]),
  // )),
  getFavoritesWeather: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
};

Favorites.defaultProps = {
  // favoritesWeather: [],
};

const mapStateToProps = state => ({
  favoritesWeather: state.app.favoritesWeather,
  loader: state.app.loader,
});

const mapDispatchToProps = dispatch => ({
  getFavoritesWeather: () => {
    dispatch(getFavoritesWeatherAction());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
