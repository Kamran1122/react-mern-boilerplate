const User = require('./User');
const { createUser, createChars, validate } = require('./utils');
const validateUser = validate(User);

describe('email', () => {
  it('unique', (done) => {
    new User({ email: 'webdeveloperpr@gmail.com', password: '12345' })
      .save()
      .then(() => {
        validateUser(createUser({ email: 'webdeveloperpr@gmail.com' }), 'email', 'webdeveloperpr@gmail.com is already taken.', done);
      });
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
  it('unique', (done) => {
    new User({ email: 'webdeveloperpr@gmail.com', password: '12345', username: 'luis' })
      .save()
      .then(() => {
        validateUser(createUser({ email: 'webdeveloperpr@gmail.com', username: 'luis' }), 'username', 'luis is already taken.', done);
      });
  });
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
    validateUser(createUser({
      country: 'US',
      state: ''
    }), 'state', 'Field is required', done);
  });
  it('stateInCountry', done => {
    validateUser(createUser({
      country: 'US',
      state: 'Puerto Rico'
    }), 'state', 'Invalid state', done);
  });
  it('stateInCountry', done => {
    validateUser(createUser({ country: 'US', state: 'Florida' }), 'state', true, done);
  });
  it('stateInCountry', done => {
    validateUser(createUser({
      country: '',
      state: 'Florida'
    }), 'state', 'Invalid state', done);
  });
  it('stateInCountry', done => {
    validateUser(createUser({ country: 'CA', state: 'Nunavut' }), 'state', true, done);
  });
});

describe('country', () => {
  it('country', done => {
    validateUser(createUser({ country: '' }), 'country', 'Field is required', done);
  });
  it('country', done => {
    validateUser(createUser({ country: 'US' }), 'country', true, done);
  });
  it('country', done => {
    validateUser(createUser({ country: 'US' }), 'country', true, done);
  });
  it('country', done => {
    validateUser(createUser({ country: 'asdf' }), 'country', 'Invalid Country', done);
  });
});
