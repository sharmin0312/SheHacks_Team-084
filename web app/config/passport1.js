const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model

const Service = require('../models/service');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(service => {
        if (!ServiceWorkerContainer) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, service.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, service);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(service, done) {
    done(null, service.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, service) {
      done(err, service);
    });
  });
};


