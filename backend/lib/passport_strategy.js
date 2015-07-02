'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User          = require('../models/User.js');

// Load strategy into passport
module.exports = function passportStrategy(passport) {
  passport.use('basic', new BasicStrategy({}, function(userIdentifier, password, done) { // Auth username/pass sent in header
    User.findOne({'basic.username': userIdentifier}, function(err, user) {
      if (err) {return done('database error');}
      if (!user) {
        User.findOne({'basic.email': userIdentifier}, function(err, user) {
          if (err) {return done('databse error');}
          if (!user) {return done('user not found');}
          user.checkPassword(password, function(result) {
            if (!result) return done('wrong password');
            return done(null, user);  // return user if no auth errors
          });
        });
      } else {
        user.checkPassword(password, function(result) {
          if (!result) return done('wrong password');
          return done(null, user);  // return user if no auth errors
        });
      }
    });
  }));
};
