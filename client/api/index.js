import axios from 'axios';
import { throwReduxAsyncErrors } from './utils';

const getToken = () => localStorage.getItem('token');

const api = axios.create({
  timeout: 1000,
  headers: {
    'Authorization': getToken(),
  }
});

const register = data => {
  return api
    .post('/api/register', data)
    .catch(err => throwReduxAsyncErrors(err));
};

const refreshToken = () => {
  // Somehow check if a token is expired
  return api
    .get('/api/refresh-token')
    .catch(err => {
      throw new Error(err);
    });
};

export {
  register,
  refreshToken,
}
