const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const countryJs = require('countryjs');

/**
 *  Validates a zipCode
 * @param zip
 * @returns {boolean}
 */
const isZip = zip => (/^\d{5}(?:[-\s]\d{4})?$/.test(zip));

/**
 * Validates a country
 * @param userCountry
 * @returns {boolean}
 */
const isCountry = userCountry => !!countryJs.name(userCountry);

/**
 * @param qty
 * @param prop
 * @returns {boolean}
 */
const minLength = (qty, prop) => !(prop.length < qty);

/**
 *
 * @param qty
 * @param prop
 * @returns {boolean}
 */
const maxLength = (qty, prop) => !(prop.length > qty);

/**
 *
 * @param prop
 * @returns {boolean}
 */
const isEmail = prop => (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(prop));

/**
 *
 * @param prop
 * @returns {boolean}
 */
const isPhone = prop => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(prop);
    phoneUtil.isValidNumber(number);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 *
 * @param state
 * @param country
 * @returns {boolean}
 */
const stateInCountry = (state, country) => {
  const states = countryJs.states(country);
  return !!states.find(x => x === state);
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
  { validator: isEmail,
    msg: 'Invalid email.'
  },
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