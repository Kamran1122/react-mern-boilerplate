const UserController = require('../controller/user');
const passport = require('passport');
require('../middleware/jwtAuth');
const { sendEmail } = require('../services/mailer');
const jwtAuth = passport.authenticate('jwt', { session: false });

// These routes require the user to be logged in and have a valid JWT token
const protectedRoutes = [
  '/api/users',
];

const authRoutes = app => {
  app.post('/api/login', UserController.login);
  app.post('/api/register', UserController.register);
  app.get('/api/refresh-token', UserController.refreshUserToken);
  app.post('/api/forget-password', UserController.forgetPassword, sendEmail);
  app.post('/api/reset-password', UserController.resetPassword);
};

const userRoutes = app => {
  // app.use(protectedRoutes, jwtAuth, (err, req, res, next) => next(req));
  app.get('/api/users', UserController.index);
  app.get('/api/users/:id', UserController.findById);
};

module.exports = (app) => {
  authRoutes(app);
  userRoutes(app);
};