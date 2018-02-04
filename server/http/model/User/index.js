const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const validation = require('./validation');

const UserSchema = Schema({
  username: {
    type: String,
    validate: validation.username,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Field is required'],
    validate: validation.email,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Field is required'],
    validate: validation.password,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  phone: {
    type: String,
    validate: validation.phone,
  },
  zipCode: {
    type: String,
    validate: validation.zipCode,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
    validate: validation.state,
  },
  country: {
    type: String,
    validate: validation.country,
  },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: '{VALUE} is already taken.' });

UserSchema
  .virtual('age')
  .get(function () {
    const now = new Date();
    return now.getFullYear() - this.birthday.getFullYear();
  });

const User = mongoose.model('user', UserSchema);

module.exports = User;
