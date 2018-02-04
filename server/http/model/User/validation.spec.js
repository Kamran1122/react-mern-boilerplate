const User = require('./User');
const { createUser, createChars, validate } = require('./utils');
const validateUser = validate(User);

describe('email', () => {
  it('required', (done) => {
    validateUser(createUser({ email: '' }), 'email', 'Field is required', done);
  });
  it('minLength', (done) => {
    validateUser(createUser({ email: '1' }), 'email', 'Field must have more than 4 characters', done);
  });
  it('maxLength', (done) => {
    validateUser(createUser({ email: createChars(41) }), 'email', 'Field must have less than 40 characters', done);
  });
  it('isEmail', (done) => {
    validateUser(createUser({ email: 'lala@gmai' }), 'email', 'Field is invalid', done);
  });
});

describe('password', () => {
  it('required', (done) => {
    validateUser(createUser({ password: '' }), 'password', 'Field is required', done);
  });
  it('minLength', (done) => {
    validateUser(createUser({ password: '1' }), 'password', 'Field must have more than 4 characters', done);
  });
  it('maxLength', (done) => {
    validateUser(createUser({ password: createChars(41) }), 'password', 'Field must have less than 40 characters', done);
  });
});

describe('username', () => {
  it('required', (done) => {
    validateUser(createUser({ username: '' }), 'username', 'Field is required', done);
  });
  it('minLength', (done) => {
    validateUser(createUser({ username: '1' }), 'username', 'Field must have more than 4 characters', done);
  });
  it('maxLength', (done) => {
    validateUser(createUser({ username: createChars(41) }), 'username', 'Field must have less than 40 characters', done);
  });
});

describe('firstName', () => {
  it('required', (done) => {
    validateUser(createUser({ firstName: '' }), 'firstName', 'Field is required', done);
  });
});

describe('lastName', () => {
  it('required', (done) => {
    validateUser(createUser({ lastName: '' }), 'lastName', 'Field is required', done);
  });
});

describe('phone', () => {
  it('isPhone', (done) => {
    validateUser(createUser({ phone: '+00787-763-3541' }), 'phone', 'Error: Invalid country calling code', done);
  });
  it('isPhone', (done) => {
    validateUser(createUser({ phone: '' }), 'phone', 'Error: The string supplied did not seem to be a phone number', done);
  });
  it('isPhone', (done) => {
    validateUser(createUser({ phone: '7877878787' }), 'phone', 'Error: Invalid country calling code', done);
  });
  it('isPhone', (done) => {
    validateUser(createUser({ phone: '+17877878787' }), 'phone', true, done);
  });
});

describe('zip', () => {
  it('required', done => {
    validateUser(createUser({ zipCode: 00927 }), 'zipCode', 'Field is invalid', done);
  });
  it('required', done => {
    validateUser(createUser({ zipCode: '00927' }), 'zipCode', true, done);
  });
});

describe('city', () => {
  it('required', done => {
    validateUser(createUser({ city: '' }), 'city', 'Field is required', done);
  });
});

describe('state', () => {
  it('required', done => {
    validateUser(createUser({ city: '' }), 'city', 'Field is required', done);
  });
});

describe('country', () => {
  it('country', done => {
    validateUser(createUser({ country: '' }), 'country', 'Field is required', done);
  });
});
