const UserController = require('../controller/user');

module.exports = (app) => {
  app.post('/api/register', UserController.register);
  // app.post('/api/login', UserController.login);
  // app.post('/api/forget-password', UserController.forget);
  // app.post('/api/reset-password', UserController.reset);
};