const User = require('../model/User');
const { userWithToken } = require('../model/User/utils');

const register = (req, res) => {
  new User(req.body)
    .save()
    .then(user => {
      res.json(userWithToken(user._id, user.toObject()));
    });
};

const login = (req, res) => {
  const { user } = req;
  res.json(userWithToken(user._id, user.toObject()));
};


module.exports = {
  register,
  login,
};