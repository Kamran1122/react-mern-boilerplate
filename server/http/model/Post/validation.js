const {
  minLength,
  maxLength,
} = require('../../../validation');

// Validate properties for the User Model
// All of these properties have access to the model properties via `this`
const title = [
  {
    validator: title => minLength(4, title),
    msg: 'Field must have more than 4 characters.'
  },
  {
    validator: title => maxLength(40, title),
    msg: 'Field must have less than 40 characters.'
  }
];

module.exports = {
  title,
};