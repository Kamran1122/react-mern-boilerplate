const validation = require('./validation');
const createChars = (qty, start = 0) => {
  let chars = [];
  for (let i = start; i < qty; i++) {
    chars.push('i');
  }

  return chars.join('');
};

describe('validation', () => {
  it('email', () => {
    expect(() => validation.email('')).to.throw('Field is required');
    expect(() => validation.email('1')).to.throw('Field must have more than 4 characters');
    expect(() => validation.email(createChars(41))).to.throw('Field must have less than 40 characters');
    expect(() => validation.email('myemailemail.com')).to.throw('Field is invalid');
  });
  it('password', () => {
    expect(() => validation.password('')).to.throw('Field is required');
    expect(() => validation.password('1')).to.throw('Field must have more than 4 characters');
    expect(() => validation.password(createChars(41))).to.throw('Field must have less than 40 characters');
  });
  it('username', () => {
    expect(() => validation.username('')).to.throw('Field is required');
    expect(() => validation.username('1')).to.throw('Field must have more than 4 characters');
    expect(() => validation.username(createChars(41))).to.throw('Field must have less than 40 characters');
  });
  it('firstName', () => {
    expect(() => validation.firstName('')).to.throw('Field is required');
  });
  it('lastName', () => {
    expect(() => validation.lastName('')).to.throw('Field is required');
  });
  it('phone', () => {
    expect(() => validation.isPhone('+00787-763-3541')).to.throw('Invalid country calling code');
    expect(() => validation.isPhone('')).to.throw('The string supplied did not seem to be a phone number');
    expect(() => validation.isPhone('7877878787')).to.throw('Invalid country calling code');
    expect(() => validation.isPhone('+17877878787')).to.not.throw(Error);
  });
  it('zip', () => {
    expect(() => validation.zipCode('00927')).to.not.throw('Field is invalid');
    expect(() => validation.zipCode(00927)).to.throw('Field is invalid');
  });
});