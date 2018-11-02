import PropTypes from 'prop-types';

export const weatherType = PropTypes.objectOf(
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
);

export const forecastType = PropTypes.arrayOf(weatherType);

export const coordsType = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
);

export const weatherIconType = PropTypes.objectOf(PropTypes.string);
export const loaderType = PropTypes.bool;
export const iconType = PropTypes.string;
export const placeDescriptionType = PropTypes.string;
export const pageNumberType = PropTypes.number;
export const funcType = PropTypes.func;
