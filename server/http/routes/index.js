const UserController = require('../controller/user/user');
const PostController = require('../controller/post/post');
const passport = require('passport');
require('../middleware/jwtAuth');

const { sendEmail } = require('../services/mailer');
const jwtAuth = passport.authenticate('jwt', { session: false });

// These routes require the user to be logged in and have a valid JWT token
const authRoutes = app => {
  app.post('/api/login', UserController.login);
  app.post('/api/register', UserController.register);
  app.post('/api/refresh-token', UserController.refreshUserToken);
  app.post('/api/forget-password', UserController.forgetPassword, sendEmail);
  app.post('/api/reset-password', UserController.resetPassword);
};

const userRoutes = app => {
  app.get('/api/users', UserController.index);
  app.get('/api/users/:id', UserController.findById);
};

const postRoutes = app => {
  app.get('/api/posts', PostController.index);
  app.post('/api/posts', PostController.create);
  app.put('/api/posts/:id', PostController.update);

  // Remove a new post, requires JWT
  app.delete('/api/posts/:id', PostController.remove);
};

module.exports = (app) => {
  authRoutes(app);
  postRoutes(app);
  userRoutes(app);
};