const UserController = require('../controller/user');

module.exports = (app) => {
  app.post('/api/login', UsersController.index);
};