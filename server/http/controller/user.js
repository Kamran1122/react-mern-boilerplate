const User = require('../model/User');
const { userWithToken } = require('../model/User/utils');

/**
 * Fetches all of the users from the database.
 * @param req
 * @param res
 */
const index = (req, res) => {
  User
    .find({})
    .select('-password')
    .then(users => {
      res.json(users);
    });
};

/**
 * Creates a new user and returns the user without password and the JKT token
 * @param req
 * @param res
 */
const register = (req, res) => {
  new User(req.body)
    .save()
    .then(user => {
      res.json(userWithToken(user._id, user.toObject()));
    });
};

/**
 * Logs in a user
 * @param req - req.user is a property passed on by the passport service
 * @param res
 */
const login = (req, res) => {
  const { user } = req;
  res.json(userWithToken(user._id, user.toObject()));
};

module.exports = {
  register,
  login,
  index,
};