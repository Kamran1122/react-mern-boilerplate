import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';

const App = props => {
  return (
    <BrowserRouter>
      <div className="app">
        {/* switch used to be able to render only the 404 page if no route match */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/forget-password" component={ForgetPassword} />
          {/* 404 */}
          <Route component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
