// noinspection JSAnnotator

// Creates a valid user
const createUser = (props = {}) => ({
  email: 'hello@world.com',
  password: '123456',
  firstName: 'Luis',
  lastName: 'Betancourt',
  age: 29,
  birthday: Date(1989, 1, 26),
  phone: '+17873737373',
  zip: 00927,
  city: 'San Juan',
  state: 'PR',
  country: 'US',
  ...props,
});

const validate = Model => (props = {}, prop = '', message = 'Field is required', done) => {
  const model = new Model();
  Object.keys(props).forEach(x => model[x] = props[x]);
  model.validate(function (err) {
    if (err) {
      expect(err.errors[prop].message).to.equal(message);
      return done();
    }
    // is valid
    expect(message).to.equal(true);
    return done();
  });
};


const createChars = (qty, start = 0) => {
  let chars = [];
  for (let i = start; i < qty; i++) {
    chars.push('i');
  }

  return chars.join('');
};

module.exports = {
  createUser,
  createChars,
  validate
};