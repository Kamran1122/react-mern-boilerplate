import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import AuthRoute from '../components/AuthRoute';
import UnauthRoute from '../components/UnauthRoute';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          {/* switch used to be able to render only the 404 page if no route match */}
          <Switch>
            <AuthRoute exact path="/" component={Home} />
            <UnauthRoute path="/login" component={Login} />
            <UnauthRoute path="/register" component={Register} />
            <UnauthRoute path="/reset-password" component={ResetPassword} />
            <UnauthRoute path="/forget-password" component={ForgetPassword} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
