import user from './user'
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

export default combineReducers({
  user,
  form,
});
