const User = require('../model/User');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { JWT_TOKEN_SECRET_KEY } = require('../model/User/utils');

const options = {
  // seems to work only when lowercased
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_TOKEN_SECRET_KEY,
};

/**
 * Gets the payload or the decoded JWT token, which we use to find a user in the database.
 * @param payload - decoded JWT token
 * @param done (error, user, info)
 */
const authFn = (payload, done) => {
  const userId = payload.id;
  // We want to see if the userID in the payload exists in our database.
  User.findById(userId, (err, user, info) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  });
};

passport.use(new JWTStrategy(options, authFn));
