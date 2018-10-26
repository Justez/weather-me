import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/components/ForecastBlock.sass';
import PropTypes from 'prop-types';

const ForecastBlock = ({ forecast, weatherIcons }) => {
  if (forecast.length > 0) {
    return (
      <div className="Forecast-block background">
        <div className="Forecast-block-timeline">
          {forecast.map(weather => (
            <div
              className={`weather-column${forecast[0].date === weather.date ? ' first' : ''}`}
              key={weather.date}
            >
              <div className="Forecast-block-date">
                {weather.date.slice(-5)}
              </div>
              <img
                alt={weather.weatherDescription}
                src={weatherIcons[weather.weatherIcon]}
              />
              <div>
                {weather.tempMax}
                &#8451;
              </div>
              <div
                className="Forecast-block-weather-poll"
                style={{
                  height: `${weather.tempMax - weather.tempMin}vh`,
                  marginTop: `${weather.highestTemp - weather.tempMax + 2}vh`,
                }}
              />
              <div>
                {weather.tempMin}
                &#8451;
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div />
  );
};

ForecastBlock.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ])),
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]))),
    ]),
  )),
  weatherIcons: PropTypes.objectOf(PropTypes.string),
};

ForecastBlock.defaultProps = {
  forecast: [],
  weatherIcons: {},
};

const mapStateToProps = state => ({
  weatherIcons: state.app.weatherIcons,
  forecast: state.app.forecast,
});

export default connect(mapStateToProps, undefined)(ForecastBlock);
