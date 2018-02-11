import axios from 'axios';
import querystring from 'querystring';
import { throwReduxAsyncErrors } from './utils';

const getToken = () => localStorage.getItem('token');

const queryfy = (data = {}) => {
  const string = querystring.stringify(data);
  return string.length ? '?'.concat(string) : '';
};

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
    .get('/api/posts'.concat(queryfy(data)))
    .catch(throwReduxAsyncErrors);
};

const getPost = id => {
  return api
    .get(`/api/posts?id=${id}`)
    .catch(throwReduxAsyncErrors);
};

const updatePost = data => {
  return api
    .put(`/api/posts/${data._id}`, data)
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
  getPost,
  getPosts,
  createPost,
  removePost,
  updatePost,
}
