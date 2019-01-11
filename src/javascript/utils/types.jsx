import PropTypes from 'prop-types';

const weatherType = PropTypes.objectOf(
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

const forecastType = PropTypes.arrayOf(weatherType);

const coordsType = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
);

const storageType = PropTypes.arrayOf(PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    )),
  ]),
));

const storageItemType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    )),
  ]),
);

const cityType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
);

const weatherIconType = PropTypes.objectOf(PropTypes.string);
const suggestionsType = PropTypes.arrayOf(PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
));
const loaderType = PropTypes.bool;
const iconType = PropTypes.string;
const stringType = PropTypes.string;
const placeDescriptionType = PropTypes.string;
const pageNumberType = PropTypes.number;
const numberType = PropTypes.number;
const funcType = PropTypes.func;

export {
  cityType,
  coordsType,
  forecastType,
  funcType,
  iconType,
  loaderType,
  numberType,
  pageNumberType,
  placeDescriptionType,
  storageItemType,
  storageType,
  stringType,
  suggestionsType,
  weatherIconType,
  weatherType,
};
