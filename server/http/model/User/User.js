const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validation = require('./validation');

const UserSchema = Schema({
  username: {
    type: String,
    validate: { validator: validation.username },
    unique: true,
  },
  email: {
    type: String,
    validate: { validator: validation.email },
    unique: true,
  },
  password: {
    type: String,
    validate: { validator: validation.password },
    required: true,
  },
  firstName: {
    type: String,
    validate: { validator: validation.firstName },
  },
  lastName: {
    type: String,
    validate: { validator: validation.lastName },
  },
  dob: {
    type: Date,
  },
  phone: {
    type: String,
    validate: { validator: validation.isPhone }
  },
  zipCode: {
    type: String,
    validate: { validator: validation.zipCode }
  },
  city: {
    type: String,
    validate: { validator: validation.city }
  },
  state: {
    type: String,
    validate: { validator: validation.state }
  },
  country: {
    type: String,
    validate: { validator: validation.country }
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
