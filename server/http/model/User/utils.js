// noinspection JSAnnotator

// Creates a valid user
const createUser = (props = {}) => ({
  email: 'hello@world.com',
  password: '123456',
  firstName: 'Luis',
  lastName: 'Betancourt',
  birthday: new Date('1989-01-26'), // test the format
  phone: '+17873737373',
  zip: 00927,
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

module.exports = {
  createUser,
  createChars,
};