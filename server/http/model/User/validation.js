const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const countryJs = require('countryjs');

const minLength = (qty, prop) => {
  if (prop.length < qty) {
    return false;
  }

  return true;
};

const maxLength = (qty, prop) => {
  if (prop.length > qty) {
    return false;
  }

  return true;
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
    return false;
  }
  return true;
};

function isPhone(prop) {
  try {
    const number = phoneUtil.parseAndKeepRawInput(prop);
    phoneUtil.isValidNumber(number);
    return true;
  } catch (err) {
    return false;
  }
}

function isZip(zip) {
  if (!/^\d{5}(?:[-\s]\d{4})?$/.test(zip)) {
    return false;
  }
  return true;
}

const isCountry = userCountry => {
  const countryExists = countryJs.name(userCountry);
  if (!countryExists) {
    return false
  }
  return true;
};

const stateInCountry = (state, country) => {
  const states = countryJs.states(country);
  const found = !!states.find(x => x === state);
  if (!found) {
    return false;
  }
  return true;
};

// Validate properties for the User Model
// All of these properties have access to the model properties via `this`

const phone = [
  {
    validator: isPhone,
    msg: 'Invalid phone'
  },
];

const email = [
  {
    validator: email => minLength(4, email),
    msg: 'Field must have more than 4 characters.'
  },
  {
    validator: email => maxLength(40, email),
    msg: 'Field must have less than 40 characters.'
  },
  { validator: isEmail, msg: 'Invalid email.' },
];

const username = [
  {
    validator: pwd => minLength(4, pwd),
    msg: 'Field must have more than 4 characters.'
  },
  {
    validator: pwd => maxLength(40, pwd),
    msg: 'Field must have less than 40 characters.'
  },
];

const password = [
  {
    validator: pwd => minLength(4, pwd),
    msg: 'Field must have more than 4 characters.'
  },
  {
    validator: pwd => maxLength(40, pwd),
    msg: 'Field must have less than 40 characters.'
  },
];

const zipCode = [
  {
    validator: isZip,
    msg: 'Invalid field'
  }
];

const state = [
  {
    validator: function (userState) {
      return stateInCountry(userState, this.country)
    },
    msg: 'Invalid state.',
  }
];

const country = [{
  validator: isCountry,
  msg: 'Invalid country.'
}];

module.exports = {
  username,
  email,
  password,
  phone,
  zipCode,
  state,
  country,
};