const User = require('../model/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const options = {
  usernameField: 'email',
  passwordField: 'password'
};

const passwordMatches = (user, done) => (err, isMatch) => {
  if (err) return done(err);
  if (!isMatch) return done(null, false, { message: 'Invalid password' });

  return done(null, user);
};

const authFn = (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    return user.comparePassword(password, passwordMatches(user, done));
  });
};

const localStrategy = new LocalStrategy(options, authFn);

passport.use(localStrategy);