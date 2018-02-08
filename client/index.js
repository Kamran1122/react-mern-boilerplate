import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import App from './views';
import reducers from './reducers';
import { scanToken } from './reducers/session';
import RefreshToken from './components/RefreshToken';
import { actions as locationActions } from './reducers/location';

// Add middleware here
const middleware = [thunk];

// options like actionSanitizer, stateSanitizer
const composeEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducers, composeEnhancers);

// Set the referrer so we can route the user after a login
store.dispatch(locationActions.setReferrer(location.pathname));

// Start scanning the JWT token and update redux store on changes.
scanToken(store.dispatch, store.getState, 1000);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RefreshToken>
        <App />
      </RefreshToken>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
