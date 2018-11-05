import React from 'react';
import axios from 'axios';
import '../../assets/stylesheets/components/FavoriteCountryBlock.sass';
import { storageItemType } from '../utils/types';
import FavoriteCityBlock from './FavoriteCityBlock';

class FavoriteCountryBlock extends React.Component {
  constructor() {
    super();
    this.state = { countryName: '' };
  }

  componentDidMount() {
    const { details } = this.props;

    axios.get(`https://restcountries.eu/rest/v2/alpha/${details.country}`)
      .then((results) => {
        if (results.status === 200) {
          this.setState({ countryName: results.data.name });
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  render() {
    const { details } = this.props;
    const { countryName } = this.state;

    return (
      <div>
        <div className="Favorites-country">
          {countryName || details.country}
        </div>
        {details.cities.map(city => (
          <div key={city.id}>
            <FavoriteCityBlock city={city} />
          </div>
        ))}
      </div>
    );
  }
}

FavoriteCountryBlock.propTypes = {
  details: storageItemType.isRequired,
};


export default FavoriteCountryBlock;
