const { createToken, decodeToken } = require('./utils');

describe('creates a JWT', () => {
  it('create a web token', () => {
    const token = createToken('123');
    const { id } = decodeToken(token);
    expect(id).to.equal('123');
  });
});