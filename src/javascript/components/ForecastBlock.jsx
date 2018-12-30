import React from 'react';
import { connect } from 'react-redux';
import '../../assets/stylesheets/components/ForecastBlock.sass';
import { forecastType, weatherIconType } from '../utils/types';

const ForecastBlock = ({ forecast, weatherIcons }) => {
  if (forecast.length) {
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
                {`${(weather.rain.mm).toFixed(1)} mm`}
              </div>
              <div>
                {`${weather.wind} km/h`}
              </div>
              <p>
                {weather.tempMax}
                &#8451;
              </p>
              <div
                className="Forecast-block-weather-poll"
                style={{
                  height: `${weather.tempMax - weather.tempMin}vh`,
                  marginTop: `${weather.highestTemp - weather.tempMax + 1}vh`,
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
  forecast: forecastType,
  weatherIcons: weatherIconType,
};

ForecastBlock.defaultProps = {
  forecast: [],
  weatherIcons: {},
};

const mapStateToProps = ({ app: { weatherIcons, forecast } }) => ({
  weatherIcons,
  forecast,
});

export default connect(mapStateToProps, undefined)(ForecastBlock);
