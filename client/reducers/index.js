import session from './session'
import auth from './auth'
import user from './user'
import location from './location'
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

export default combineReducers({
  session,
  location,
  auth,
  user,
  form,
});
