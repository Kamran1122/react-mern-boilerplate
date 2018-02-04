const UserController = require('../controller/user');
const passport = require('passport');
require('../middleware/passport');

const localSignIn = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.post('/api/register', UserController.register);
  app.post('/api/login', localSignIn, UserController.login);
};