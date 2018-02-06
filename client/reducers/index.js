import location from './location'
import auth from './auth'
import user from './user'
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

export default combineReducers({
  location,
  auth,
  user,
  form,
});
