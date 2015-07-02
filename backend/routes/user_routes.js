'user strict';

var bodyparser = require('body-parser');
var User       = require('../models/User.js');

module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json());

  // Existing user login
  router.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res) {
    // passport_strategy adds req.user
    req.user.generateToken(process.env.AUTH_SECRET, function(err, token) {
      if (err) {
        console.log('Error signin user in. Error: ', err);
        return res.status(500).json({success: false, msg: 'error logging in'});
      }
      res.json({success: true, token: token, username: req.user.basic.username});
    });
  });

  // Create new user
  router.post('/create_new_user', function(req, res) {
    // Explicitly populate user model to avoid overflow exploit
    var newUser = new User({
      basic: {
        email: req.body.email,
        username: req.body.username
      }
    });

    newUser.generateHash(req.body.password, function(err, hash) {
      if(err) {
        console.log(err);
        return res.status(500).json({
          'success': false,
          'msg': 'Could not create user'
        });
      }
      newUser.basic.password = hash;
      console.log(newUser);
      newUser.save(function(err, user) {
        if(err) {
          console.log(err);
          return res.status(500).json({
            'success': false,
            'msg': 'Could not create user'
          });
        }
        user.generateToken(process.env.AUTH_SECRET, function(err, token) {
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
            'token': token,
            'username': user.basic.username
          });
        });
      });
    });
  });
};
