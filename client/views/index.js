import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
// Auth
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import Register from './Auth/Register';
import ResetPassword from './Auth/ResetPassword';
import ForgetPassword from './Auth/ForgetPassword';

// Posts
import NewPost from './Blog/NewPost';
import MyPosts from './Blog/MyPosts';
import EditPost from './Blog/EditPost';
import ViewPosts from './Blog/ViewPosts';

// Route components
import NotFound from '../components/NotFound';
import AuthRoute from '../components/AuthRoute';
import UnauthRoute from '../components/UnauthRoute';

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* Switch used to be able to render only the 404 page if no route match */}
        {/* Do not use react fragments inside Switch Components it will mess up route matching */}
        <Switch>
          {/* Auth Routes */}
          <AuthRoute path="/logout" component={Logout} />
          <UnauthRoute path="/login" component={Login} />
          <UnauthRoute path="/register" component={Register} />
          <UnauthRoute path="/forget-password" component={ForgetPassword} />
          <UnauthRoute path="/reset-password/:token" component={ResetPassword} />

          {/* Post routes */}
          <Route path="/" component={ViewPosts} exact />
          <Route path="/posts" component={ViewPosts} exact />
          <Route path="/posts/new" component={NewPost} exact />
          <Route path="/posts/view" component={MyPosts} exact />
          <Route path="/posts/edit/:id" component={EditPost} />

          {/* 404 */}
          <NotFound to="/" />
        </Switch>
      </div>
    );
  };
}

export default App;
