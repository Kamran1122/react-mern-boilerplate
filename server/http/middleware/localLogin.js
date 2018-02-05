const User = require('../model/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const options = {
  usernameField: 'email',
  passwordField: 'password'
};

/**
 * Callback that is used to return the user if the form password matches the database
 * password.
 * @param user
 * @param done
 * @returns {function(*=, *=)}
 */
const passwordMatches = (user, done) => (err, isMatch) => {
  if (err) return done(err);
  if (!isMatch) return done(null, false, { message: 'Invalid password' });

  return done(null, user);
};

/**
 * authentication of the user using the email and the password. It uses user.comparePassword
 * which is a User model function to compare the passwords.
 * @param email
 * @param password
 * @param done
 */
const authFn = (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect email.' });

    return user.comparePassword(password, passwordMatches(user, done));
  });
};

passport.use(new LocalStrategy(options, authFn));