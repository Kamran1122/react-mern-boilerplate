const User = require('./User');

const newUser = (props = {}) => ({
  email: 'hello@world.com',
  password: '123',
  firstName: 'Luis',
  lastName: 'Betancourt',
  age: 29,
  birthday: Date(1989, 1, 26),
  phone: 7877633541,
  number: 00927,
  city: 'San Juan',
  state: 'PR',
  country: 'US',
  ...props,
});

describe('User Model', () => {
  xit('Create a user', done => {
    const user1 = newUser();
    new User(user1)
      .save()
      .then(() => {
        User
          .findOne({ email: 'hello@world.com' })
          .then(user => {
            expect(user.name).to.equal(user1.name);
            done();
          })
      });
  });
});

describe('User Validation', () => {
  it('should validate email', done => {
    const user1 = newUser({ email: '' });
    new User(user1)
      .save()
      .then(() => User.findOne({ email: user1.email }))
      .catch(err => {
        const error = err.errors.email.message;
        console.log(error);
        // expect(error).to.equal('{VALUE} is not a valid email!');
        done();
      });
  });
});