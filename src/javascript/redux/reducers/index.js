import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import pagesReducer from './pagesReducer';

export default combineReducers({
  app: mainReducer,
  pages: pagesReducer,
});
