'use strict';

var Message = require('../models/Message');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);

module.exports = function (router) {
  router.use(bodyparser.json());
  //get all messages
  router.get('/dashboard', eatAuth, function (req, res) {

    Message.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  router.get('/threads', function(req, res) {
    var jsonData = {
      threads: [
        {roomID: 1, messages: [
          {timestamp: Date.now(), username: 'UserX', message: 'User X says X'},
          {timestamp: Date.now(), username: 'UserY', message: 'I am Y'},
          {timestamp: Date.now(), username: 'UserX', message: 'But I am X'}
        ]},
        {roomID: 2, messages: [
          {timestamp: Date.now(), username: 'UserP', message: 'Hello, I am P'},
          {timestamp: Date.now(), username: 'UserQ', message: 'My name is Q'},
          {timestamp: Date.now(), username: 'UserP', message: 'Hello Q'}
        ]}
      ]
    };
    res.json(jsonData)
  });

  router.post('/new_message', function(req, res) {
    if (!req.body.username) {res.json({msg: 'fail: send a username!'})}
    if (!req.body.roomID) {res.json({msg: 'fail: send a roomID!'})}
    if (!req.body.message) {res.json({msg: 'fail: send a message!'})}
    if (!req.body.timestamp) {res.json({msg: 'fail: send a timestamp!'})}
    res.json({msg: 'successful post!'})
  });

  router.get('/dashboard/:user', eatAuth, function (req, res) {

    Message.find({users: req.params.user}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log(data);
      res.json(data);
    });
  });

  //create message
  router.post('/messages/createmessage', eatAuth, function (req, res) {
    var newMessage = new Message(req.body);
    newMessage.save(function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  //edit messages
  router.patch('/messages/patchmessage', eatAuth, function(req, res) {
    var threadID = req.body.threadID
    var userToBeAdded = req.body.username
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }

    Message.update({'threadID': threadID}, { $push: {users: usersToBeAdded } })
    console.log('message updated');
  });
}
