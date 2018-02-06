import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import App from './views';
import reducers from './reducers';
import { refreshToken } from './api';
import { actions as userActions } from './reducers/user';
import { actions as authActions } from './reducers/auth';
// If token exists try to fetch the users information so it's available in the reducer

const devTools = process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, {}, devTools);

// Check if there is a JWT token and auth/unauth user.
if (localStorage.token) {
  refreshToken()
    .then(({ data }) => {
      store.dispatch(userActions.userLogin(data));
      store.dispatch(authActions.authUser());
    })
    .catch(err => {
      localStorage.removeItem('token');
      store.dispatch(userActions.userLogin({}));
      store.dispatch(authActions.unauthUser());
    });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('#root'));
