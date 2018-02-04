const User = require('../model/User');
const register = (req, res) => {
  new User(req.body)
    .save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res
        .status(400)
        .send({ error: err })
    });
};

module.exports = {
  register,
};