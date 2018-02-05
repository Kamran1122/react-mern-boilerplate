const R = require('ramda');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const JWT_TOKEN_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY;

// Creates a valid user.
const createUser = (props = {}) => ({
  email: 'hello@world.com',
  password: '123456',
  firstName: 'Luis',
  lastName: 'Betancourt',
  birthday: new Date('1989-01-26'),
  phone: '+17873737373',
  zip: '00927',
  city: 'Hallandale',
  state: 'Florida',
  country: 'US',
  ...props,
});

/**
 * Creates strings of a character determined by the qty.
 * @param qty
 * @param start
 * @returns {string}
 */
const createChars = (qty, start = 0) => {
  let chars = [];
  for (let i = start; i < qty; i++) {
    chars.push('i');
  }

  return chars.join('');
};

function hashPassword() {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(this.password, salt, null, (err, result) => {
      this.password = result;
    })
  });
}

/**
 * Creates the JWT token used when logging in or registering the user.
 * @param id
 * @returns {*}
 */
const createToken = id => {
  const options = {
    expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
  };

  return jwt.sign({ id }, JWT_TOKEN_SECRET_KEY, options);
};

/**
 * Decodes the JWT token
 * @param token
 * @returns {*}
 */
const decodeToken = token => {
  return jwt.decode(token, JWT_TOKEN_SECRET_KEY);
};

/**
 * Creates a user with a JWT token and omits the password. This can be used
 * to safely send a response back to the client.
 * @param id
 * @param user
 */
const userWithToken = (id, user) => {
  const token = createToken(id);
  return R.omit(['password'], { ...user, token: token });
};

module.exports = {
  createUser,
  createChars,
  hashPassword,
  createToken,
  decodeToken,
  userWithToken,
  JWT_TOKEN_SECRET_KEY,
};