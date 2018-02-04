const User = require('./User');
const { createUser } = require('./utils');

describe('User Model', () => {
  it('Create a user', done => {
    const user1 = createUser();
    new User(user1)
      .save()
      .then(() => {
        User
          .findOne({ email: 'hello@world.com' })
          .then(user => {
            expect(user.name).to.equal(user1.name);
            done();
          })
      })
  });
});