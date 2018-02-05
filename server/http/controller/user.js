const User = require('../model/User');
const {
  userWithToken,
  formatValidationError, refreshToken, decodeToken
} = require('../model/User/utils');

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
 * API call should fail if the email is already in use.
 * @param req
 * @param res
 */
const register = (req, res) => {
  new User(req.body)
    .save()
    .then(user => {
      res.json(userWithToken(user._id, user.toObject()));
    })
    .catch(err => {
      res
        .status(422)
        .send(formatValidationError(err, 'Error creating user'));
    });
};

/**
 * Refreshes a users token if the iat is within valid range, and sends
 * back the user
 * @param req
 * @param res
 */
const refreshUserToken = (req, res) => {
  const token = req.header('authorization');
  if (!token) {
    res
      .status(400)
      .send({ error: { token: 'could not generate token' } })
  }

  const newToken = refreshToken(token);
  const { id } = decodeToken(newToken);

  User
    .findById(id)
    .select('-password')
    .then(user => {
      res
        .status(200)
        .json(userWithToken(user._id, user.toObject()));
    })
    .catch(err => {
      res
        .status(400)
        .send({ error: { token: 'could not generate token' } })
    });
};

/**
 * Logs in a user, we are using this instead of passport so that we can send back custom
 * errors back to the client.
 * @param req - req.user is a property passed on by the passport service
 * @param res
 */
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ errors: { email: 'Email is empty' } });
  }

  if (!password) {
    return res
      .status(400)
      .json({ errors: { email: 'Password is empty' } });
  }

  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).send({ errors: { email: 'Email does not exist' } });
      }

      user.comparePassword(password, (err, isMatch) => {
        isMatch
          ? res.status(200).send(userWithToken(user._id, user.toObject()))
          : res.status(400).send({ errors: { password: 'Passwords do not match' } })
      });

    }).catch(err => {
    res
      .status(400)
      .json({ errors: { email: 'Unknown error' } });
  });
};

// TODO: [] Test
/**
 * finds a user in the database
 * @param req - req.user is a property passed on by the passport service
 * @param res
 */
const findById = (req, res) => {
  const { id } = req.params;
  User
    .findById(id)
    .select('-password')
    .then(user => res.send(user))
    .catch(err => {
      res.send({ error: { _id: '_id was not found' } })
    });
};

module.exports = {
  register,
  login,
  index,
  findById,
  refreshUserToken,
};