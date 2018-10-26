import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/stylesheets/containers/Main.sass';
import CurrentWeatherBlock from '../components/CurrentWeatherBlock';
import CurrentWeatherDetails from '../components/CurrentWeatherDetails';
import ForecastBlock from '../components/ForecastBlock';
import Map from '../components/Map';

class Main extends React.Component {
  componentDidMount() {

  }

  render() {
    const { loader } = this.props;

    return (
      <div className="Main">
        <div className="Main-content">
          <div className="Main-data-column">
            {loader
              && (
                <div className="loading">
                Loading...
                </div>
              )
            }
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
  }
}

const mapStateToProps = state => ({
  loader: state.app.loader,
});

Main.propTypes = {
  // forecast: PropTypes.arrayOf(PropTypes.objectOf(
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
  loader: PropTypes.bool,
};

Main.defaultProps = {
  loader: false,
};

export default connect(mapStateToProps, undefined)(Main);
