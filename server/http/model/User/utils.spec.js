const { createToken } = require('./utils');

describe.only('creates a JWT', () => {
  it('create a web token', () => {
    const token = createToken('123');
  });
});