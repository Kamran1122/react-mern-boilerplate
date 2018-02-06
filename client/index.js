import React from 'react';
import history from 'history';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './views';
import reducers from './reducers';
import { refreshToken } from './api';
import { actions as userActions } from './reducers/user';
import { actions as authActions } from './reducers/auth';
import { actions as locationActions } from './reducers/location';
// If token exists try to fetch the users information so it's available in the reducer

const devTools = process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, {}, devTools);
const referrer = location.pathname;
store.dispatch(locationActions.setReferrer(referrer));

// Check if there is a JWT token and auth/unauth user.
if (localStorage.token) {
  refreshToken()
    .then(({ data }) => {
      store.dispatch(userActions.userLogin(data));
      store.dispatch(authActions.authUser());
      // It takes some time for the user to be authenticated. The protected routes will
      // start redirecting the user from the intended page. Here we correctly route the
      // user if the current token is valid. I wonder if there is a different way to
      // do this.
      history.push(referrer);
    })
    .catch(err => {
      localStorage.removeItem('token');
      store.dispatch(userActions.userLogin({}));
      store.dispatch(authActions.unauthUser());
    });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
