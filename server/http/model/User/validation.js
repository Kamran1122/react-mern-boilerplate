const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

// Reusable validators
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

function isPhone(prop) {
  try {
    const number = phoneUtil.parseAndKeepRawInput(prop);
    phoneUtil.isValidNumber(number);

  } catch (err) {
    throw new Error(err);
  }
}

function isZip(zip) {
  if (!/^\d{5}(?:[-\s]\d{4})?$/.test(zip)) {
    throw new Error('Field is invalid');
  }
}

// Validate properties for the User Model
// All of these properties have access to the model properties via `this`

function email(email) {
  required(email);
  minLength(4, email);
  maxLength(40, email);
  isEmail(email);
}

function username(name) {
  required(name);
  minLength(4, name);
  maxLength(40, name);
}

function password(pwd) {
  required(pwd);
  minLength(4, pwd);
  maxLength(40, pwd);
}

function firstName(name) {
  required(name);
}

function lastName(name) {
  required(name);
}

function zipCode(zip) {
  isZip(zip);
}

function city(userCity) {
  required(userCity);
}

function state(userState) {
  required(userState);
}

function country(userCountry) {
  required(userCountry);
}

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