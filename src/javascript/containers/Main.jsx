/* eslint-disable no-undef */
import { connect } from 'react-redux';
import '../../assets/stylesheets/containers/Main.sass';
import { loaderType } from '../utils/types';
import CurrentWeatherBlock from '../components/Main/CurrentWeatherBlock';
import CurrentWeatherDetails from '../components/Main/CurrentWeatherDetails';
import ForecastBlock from '../components/Main/ForecastBlock';
import Map from '../components/Main/Map';

const Main = ({ loader }) => {
  if (loader) {
    return (
      <div className="loading">Loading...</div>
    );
  }

  return (
    <div className="Main">
      <div className="Main-content">
        <div className="Main-data-column">
          <CurrentWeatherBlock />
          <ForecastBlock />
          <CurrentWeatherDetails />
        </div>
        <div className="Main-map">
          <Map />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ app: { loader } }) => ({ loader });

Main.propTypes = { loader: loaderType.isRequired };

export default connect(mapStateToProps)(Main);
