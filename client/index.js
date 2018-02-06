import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './views';
import reducers from './reducers';
import RefreshToken from './components/RefreshToken';
import { actions as locationActions } from './reducers/location';

const store = process.env.NODE_ENV === 'production'
  ? createStore(reducers, {})
  : createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const referrer = location.pathname === '/logout' ? '/' : location.pathname;
store.dispatch(locationActions.setReferrer(referrer));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RefreshToken>
        <App />
      </RefreshToken>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
