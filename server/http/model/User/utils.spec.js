const { createToken } = require('./utils');
const jwt = require('jsonwebtoken');

describe('creates a JWT', () => {
  it('create a web token', () => {
    const token = createToken('123');
    const result = jwt.decode(token, 'secret_code');
    expect(result.id).to.equal('123');
    expect(result.jti).to.equal('123');
  });
});