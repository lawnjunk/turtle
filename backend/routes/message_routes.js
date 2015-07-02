'use strict';

var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var Message = require('../models/Message');
var Thread = require('../models/Thread');

function getMessages(threadName, callback) {
  Message.find({'threadName': threadName}, function(err, threadName, messages) {
    if (err) { callback(err); }
    callback(null, threadName, messages);
  });
}

module.exports = function (router) {
  router.use(bodyparser.json());

  //get all threads
  router.get('/threads', function(req, res) {
    var username = req.user.basic.username || 'ee';
    Thread.find({'users': username}, function(err, threads) {
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, msg: 'internal server error'})
      }
      //loop over threads and get all messages for each
      for (var i=1; i<threads.length; i++) {
        getMessages(threads[i].threadName, function(err, threadName, messages) {
          if (err) {return afterGettingAllMessages(err);}
          var threadObj = {
            threadName: threadName,
            messages: []
          };
          for (var j=0; j<messages; j++) {
            var messageObj = {
              username: messages[j].authorName,
              message: messages[j].text,
              timeStamp: messages[j].timeStamp
            }
            threadObj.messages.push(messageObj);
          }
          afterGettingAllMessages(null, threadObj);
        });
      }
      var count = 0;
      var returnData = {threads: [], errors: []};
      function afterGettingAllMessages(err, threadObj) {
        count++;
        if (err) {returnData.errors.push(err);}
        if (threadObj) {returnData.threads.push(threadObj);}
        if (count === threads.length) {
          res.json(returnData);
        }
      }
    });
  });

  //get all messages for a thread
  // router.get('/messages/createmessage', eatAuth, function (req, res) {
  //   var newMessage = new Message(req.body);
  //   newMessage.save(function (err, data) {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({msg: 'internal server error'});
  //     }
  //     res.json(data);
  //   });
  // });

  //create new thread
  router.post('/threads', function(req, res) {
    //add logged in user to thread users list
    req.body.users.push(req.user.basic.username);

    //create and save new thread
    var newThread = new Thread(req.body);
    newThread.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, msg: 'internal server error'})
      }
      res.json(data);
    });
  });

  //create new message
  router.post('/message', function(req, res) {
    var username = req.user.basic.username || 'ee';
    var newMessage = new Message({
      threadName: req.body.threadName,
      authorName: username,
      text: req.body.message,
      timeStamp: req.body.timeStamp
    });
    newMessage.save(function(err, user) {
      if(err) {
        console.log(err);
        return res.status(500).json({
          'success': false,
          'msg': 'Could not save message'
        });
      }
      res.json({
        'success': true,
        'msg': 'message saved'
      });
    });
  });
}
