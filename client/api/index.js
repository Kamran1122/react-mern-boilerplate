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
    .catch(throwReduxAsyncErrors);
};

const login = data => {
  return api
    .post('/api/login', data)
    .catch(throwReduxAsyncErrors);
};

const resetPassword = data => {
  return api
    .post('/api/reset-password', data)
    .catch(throwReduxAsyncErrors);
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
  login,
  register,
  refreshToken,
  resetPassword,
}
