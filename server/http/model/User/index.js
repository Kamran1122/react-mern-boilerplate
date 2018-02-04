const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validation = require('./validation');
const uniqueValidator = require('mongoose-unique-validator');
const { hashPassword, createToken, decodeToken } = require('./utils');

const UserSchema = Schema({
  username: {
    type: String,
    validate: validation.username,
    unique: true,
    sparse: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Field is required'],
    validate: validation.email,
    unique: true,
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Field is required'],
    validate: validation.password,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  birthday: {
    type: Date,
  },
  phone: {
    type: String,
    validate: validation.phone,
    trim: true,
  },
  zipCode: {
    type: String,
    validate: validation.zipCode,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    validate: validation.state,
    trim: true,
  },
  country: {
    type: String,
    validate: validation.country,
    trim: true,
  },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: '{VALUE} is already taken.' });

// Middleware
UserSchema.pre('save', function () {
  hashPassword.call(this);
});

// Virtual properties
UserSchema
  .virtual('age')
  .get(function () {
    const now = new Date();
    return now.getFullYear() - this.birthday.getFullYear();
  });

UserSchema
  .virtual('token')
  .get(function () {
    return createToken(this._id);
  });

// Model methods
UserSchema.methods.decodeToken = function () {
  return decodeToken(this.token);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;