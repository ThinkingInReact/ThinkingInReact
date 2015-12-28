import { combineReducers } from 'redux';
import toc from './toc';
import menuopen from './menuopen';
import user from './user';

export default combineReducers({
  toc,
  menuopen,
  user
});
