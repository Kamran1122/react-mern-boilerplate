const UserController = require('../controller/user');

module.exports = (app) => {
  app.post('/api/register', UserController.register);
};