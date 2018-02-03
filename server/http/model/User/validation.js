// Require `PhoneNumberFormat`.
const PNF = require('google-libphonenumber').PhoneNumberFormat;
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const required = prop => {
  if (!prop) {
    throw new Error('Field is required');
  }
};

const minLength = (qty, prop) => {
  if (prop.length < qty) {
    throw new Error('Field must have more than 4 characters');
  }
};

const maxLength = (qty, prop) => {
  if (prop.length > qty) {
    throw new Error('Field must have less than 40 characters');
  }
};

const min = (qty, prop) => {
  if (prop < qty) {
    throw new Error(`Field be more than ${qty}`);
  }
};

const max = (qty, prop) => {
  if (prop > qty) {
    throw new Error(`Field be less than ${qty}`);
  }
};

const isEmail = prop => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(prop)) {
    throw new Error('Field is invalid');
  }
};

const isPhone = prop => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(prop);
    phoneUtil.isValidNumber(number);

  } catch (err) {
    throw new Error(err);
  }
};

const isZip = zip => {
  if (!/^\d{5}(?:[-\s]\d{4})?$/.test(zip)) {
    throw new Error('Field is invalid');
  }
};

const email = email => {
  required(email);
  minLength(4, email);
  maxLength(40, email);
  isEmail(email);
};

const username = name => {
  required(name);
  minLength(4, name);
  maxLength(40, name);
};

const password = pwd => {
  required(pwd);
  minLength(4, pwd);
  maxLength(40, pwd);
};

const firstName = name => {
  required(name);
};

const lastName = name => {
  required(name);
};

const zipCode = zip => {
  isZip(zip);
};

const city = userCity => {
  required(userCity);
};

const state = userState => {
  required(userState);
};

const country = userCountry => {
  required(userCountry);
};

module.exports = {
  username,
  email,
  password,
  firstName,
  lastName,
  isPhone,
  zipCode,
  city,
  state,
  country,
};