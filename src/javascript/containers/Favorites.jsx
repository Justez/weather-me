/* eslint-disable no-undef */

import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/containers/Favorites.sass';
import FavoriteCountryBlock from '../components/Favorites/FavoriteCountryBlock';
import { getFavoritesAction } from '../redux/actions/placesActions';
import { loaderType, funcType, storageType } from '../utils/types';

class Favorites extends React.Component {
  componentDidMount() {
    const { getFavorites } = this.props;
    getFavorites();
  }

  render() {
    const { loader, favorites } = this.props;

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
          {favorites.map(fav => (
            <div key={`${fav.country}${Math.random()}`} className="Favorites-country-block">
              <FavoriteCountryBlock details={fav} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  favorites: storageType.isRequired,
  getFavorites: funcType.isRequired,
  loader: loaderType.isRequired,
};

const mapStateToProps = ({ app: { favorites, loader } }) => ({
  favorites,
  loader,
});

const mapDispatchToProps = dispatch => ({
  getFavorites: () => dispatch(getFavoritesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
