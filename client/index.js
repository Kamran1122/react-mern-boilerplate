import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './views';
import reducers from './reducers';
import RefreshToken from './components/RefreshToken';
import { actions as locationActions } from './reducers/location';

const devTools = process.env.NODE_ENV === 'development'
  && window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, {}, devTools);
const referrer = location.pathname;
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
