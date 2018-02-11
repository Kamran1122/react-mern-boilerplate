import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import App from './views';
import reducers from './reducers';
import { scanToken } from './reducers/session';
import RefreshToken from './components/Auth/RefreshToken';
import { actions as locationActions } from './reducers/location';

const history = createHistory();

// Add middlewares here
const middleware = applyMiddleware(...[
  thunk,
  routerMiddleware()
]);

const enhancers = composeWithDevTools({
  actionsBlacklist: ['SET_SESSION'],
});

const composeEnhancers = enhancers(middleware);
const store = createStore(reducers, composeEnhancers);

// Set the referrer so we can route the user after a login
store.dispatch(locationActions.setReferrer(location.pathname));

// Start scanning the JWT token and update redux store on changes.
// scanToken(store.dispatch, store.getState, 60000);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RefreshToken>
        <App />
      </RefreshToken>
    </ConnectedRouter>
  </Provider>
  , document.querySelector('#root'));
