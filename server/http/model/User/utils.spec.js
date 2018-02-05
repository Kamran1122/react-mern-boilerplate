const { createToken, decodeToken, formatValidationError } = require('./utils');
const mongoose = require('mongoose');
const MongooseError = mongoose.Error;

describe('creates a JWT', () => {
  it('create a web token', () => {
    const token = createToken('123');
    const { id } = decodeToken(token);
    expect(id).to.equal('123');
  });

  it('should format redux form errors', () => {
    const error = {
      errors: {
        email: new MongooseError.ValidatorError({
          message: 'Invalid email',
          kind: 'custom error',
          path: 'email',
          value: '',
          reason: 'This is a test error',
        }),
        password: new MongooseError.ValidatorError({
          message: 'Invalid password',
          kind: 'custom error',
          path: 'password',
          value: '',
          reason: 'This is a test error',
        })
      },
    };
    const result = formatValidationError(error, 'Error creating user');
    expect(result).to.deep.equal({
      errors: {
        _error: 'Error creating user',
        email: 'Invalid email',
        password: 'Invalid password',
      }
    })
  });
});