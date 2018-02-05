const UserController = require('../controller/user');
const passport = require('passport');
require('../middleware/jwtAuth');

const jwtAuth = passport.authenticate('jwt', { session: false });

// These routes require the user to be logged in and have a valid JWT token
const protectedRoutes = [
  '/api/users',
];

const authRoutes = app => {
  app.post('/api/register', UserController.register);
  app.post('/api/login', UserController.login);
  app.get('/api/refresh-token', UserController.refreshUserToken);
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