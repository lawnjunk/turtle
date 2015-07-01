'user strict';

var bodyparser = require('body-parser');
var User       = require('../models/User.js');
var _          = require("lodash");


module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json());

  // Existing user login
  router.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    // passport_strategy adds req.user
    req.user.generateToken(process.env.AUTH_SECRET, function(err, token) {
      if (err) {
        console.log('Error signin user in. Error: ', err);
        return res.status(500).json({success: false, eat: null, msg: 'error logging in'});
      }
      res.json({success: true, eat: token, username: req.user.basic.username});
    });
  });

  // Create new user
  router.post('/users', function(req, res) {
    // Explicitly populate user model to avoid overflow exploit
    var newUser = new User({
      basic: {
        email: req.body.email,
        username: req.body.username
      }
    });

    if(req.body.password === undefined) {
      console.log('No password submitted');
      return res.status(401).json({
        'success': false,
        'msg': 'No password submitted'
      });
    }
    newUser.generateHash(req.body.password, function(err, hash) {
      if(err) {
        console.log(err);
        return res.status(500).json({
          'success': false,
          'msg': 'Could not create user'
        });

      }
      newUser.basic.password = hash;
      newUser.save(function(err, user) {
        if(err) {
          console.log(err);
          return res.status(500).json({
            'success': false,
            'msg': 'Could not create user'
          });
        }
        user.generateToken(process.env.APP_SECRET, function(err, token) {
          if(err) {
            console.log(err);
            return res.status(500).json({
              'success': false,
              'msg': 'Error generating token'
            });
          }

          res.json({
            'success': true,
            'msg': 'You have successfully created a user',
            'data': {
              'token': token,
            }
          });
        });
      });


    // generate hash & save user
    newUser.generateHash(req.body.password, function(hash) {
      newUser.basic.password = hash;
      newUser.save(function(err, user) {
        if (err && _.contains(err.errmsg, "$user")) {
          return res.status(500).json({success: false, usernamePass: false, emailPass: null, passwordPass: null});
        }
        if (err && _.contains(err.errmsg, ".email")) {
          return res.status(500).json({success: false, usernamePass: true, emailPass: false, passwordPass: null});
        }
        if (err) {
          return res.status(500).json({success: false,  usernamePass: null, emailPass: null, passwordPass: null});
        }
        res.json({success: true, usernamePass: true, emailPass: true, passwordPass: null});
      });
    });
  });
};
