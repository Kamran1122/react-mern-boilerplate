import axios from 'axios';
import { throwReduxAsyncErrors } from './utils';
import jwt from 'jsonwebtoken';

const getToken = () => {
  return localStorage.getItem('token');
};

const register = data => {
  return axios
    .post('/api/register', data)
    .catch(err => throwReduxAsyncErrors(err));
};

const findUserWithToken = data => {
  // Somehow check if a token is expired
  const token = getToken();
  if (!token) return Promise.reject();
  const decodedToken = jwt.decode(getToken(), process.env.JWT_TOKEN_SECRET_KEY);
  if (!decodedToken) Promise.reject();
  const { id } = decodedToken;
  return axios
    .get(`/api/users/${id}`, data)
    .catch(err => throwReduxAsyncErrors(err));
};

export {
  register,
  findUserWithToken,
}
