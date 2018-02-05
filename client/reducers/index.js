import jwt from './jwt'
import user from './user'
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

export default combineReducers({
  jwt,
  user,
  form,
});
