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

const forgetPassword = data => {
  return api
    .post('/api/forget-password', data)
    .catch(throwReduxAsyncErrors);
};

const resetPassword = data => {
  return api
    .post('/api/reset-password', data)
    .catch(throwReduxAsyncErrors);
};

const refreshToken = () => {
  return api
    .post('/api/refresh-token', {})
    .catch(err => {
      throw new Error(err);
    });
};

const createPost = data => {
  return api
    .post('/api/posts', data)
    .catch(throwReduxAsyncErrors);
};

const removePost = id => {
  return api
    .delete(`/api/posts/${id}`)
    .catch(throwReduxAsyncErrors);
};

const getPosts = data => {
  return api
    .get('/api/posts', data)
    .catch(throwReduxAsyncErrors);
};

export {
  // auth
  login,
  register,
  refreshToken,
  resetPassword,
  forgetPassword,
  // posts
  getPosts,
  createPost,
  removePost,
}
