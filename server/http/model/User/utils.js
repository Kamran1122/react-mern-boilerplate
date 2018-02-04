const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
// noinspection JSAnnotator

// Creates a valid user
const createUser = (props = {}) => ({
  email: 'hello@world.com',
  password: '123456',
  firstName: 'Luis',
  lastName: 'Betancourt',
  birthday: new Date('1989-01-26'), // test the format
  phone: '+17873737373',
  zip: '00927',
  city: 'Hallandale',
  state: 'Florida',
  country: 'US',
  ...props,
});

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

const createToken = id => {
  const options = {
    expiresIn: 60 * 60, // 60sec * 60min = 1hr
    jwtid: id,
  };

  return jwt.sign({ id }, 'secret_code', options);
};

module.exports = {
  createUser,
  createChars,
  hashPassword,
  createToken,
};