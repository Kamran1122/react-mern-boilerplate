import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Login from './Login';
import Register from './Register';
import NotFound from '../components/NotFound';
import ResetPassword from './ResetPassword';
import ForgetPassword from './ForgetPassword';
import AuthRoute from '../components/AuthRoute';
import UnauthRoute from '../components/UnauthRoute';

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* switch used to be able to render only the 404 page if no route match */}
        <Switch>
          <AuthRoute exact path="/" component={Home} />
          <AuthRoute path="/path1" component={() => <h2>Path1</h2>} />
          <UnauthRoute path="/login" component={Login} />
          <UnauthRoute path="/register" component={Register} />
          <UnauthRoute path="/reset-password" component={ResetPassword} />
          <UnauthRoute path="/forget-password" component={ForgetPassword} />
          <Route path="/blog" component={() => <h2>Blog</h2>}/>
          <NotFound to="/" />
        </Switch>
      </div>
    );
  };
}

export default App;
