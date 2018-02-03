const mongoose = require('mongoose');
const { expect } = require('chai');
const { DB_TEST } = require('../config/constants');

global.expect = expect;

// create a mongoose connection
before(done => {
  mongoose.connect(DB_TEST);
  mongoose
    .connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', err);
    })
});

// drop the mongoose collection before every test
beforeEach(done => {
  const { users } = mongoose
    .connection
    .collections;

  users
    .drop()
    .then(() => done())
    .catch(() => done())
});