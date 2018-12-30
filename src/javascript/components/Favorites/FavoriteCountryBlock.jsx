import React from 'react';
import axios from 'axios';
import { storageItemType } from '../../utils/types';
import FavoriteCityBlock from './FavoriteCityBlock';

class FavoriteCountryBlock extends React.Component {
  constructor() {
    super();
    this.state = { countryName: '' };
  }

  componentDidMount() {
    const { details } = this.props;

    axios.get(`https://restcountries.eu/rest/v2/alpha/${details.country}`)
      .then(({ status, data }) => (status === 200)
        && this.setState({ countryName: data.name }));
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

FavoriteCountryBlock.propTypes = { details: storageItemType.isRequired };

export default FavoriteCountryBlock;
