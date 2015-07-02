//Cors
var cors = require('./backend/cors');
app.use(cors());



//Socket IO Code removed from server.js
var io = require('socket.io').listen(http);
var eat_io_auth = require('./backend/lib/eat_auth_io.js');

io.on('connection', function(socket){
  console.log(socket.handshake.headers.cookie);
  //var cookie = {};
  //socket.handshake.headers.cookie.toString().split(' ').forEach(function(param) {
    //cookie[param.split('=')[0]] = param.split('=')[1];
  //});
  //console.log(cookie);
  //var eat = cookie.eat;

  eat_io_auth( socket, function(err, user) {
    if (err) {
      console.log('socket fucked up ', socket.id);
      return socket.emit('login', {success: false, msg: 'fuck'});
    };
    console.log(user);
    connectedUses[user.username] = {socket_id: socket.id}
    console.log(connectedUses);

    socket.emit('login', {username: user.username, msg: 'login success', success: 'true'});
  });
  socket.emit('news', {msg: 'sup slug'});

  socket.on('chat message', function(msg){
    console.log(msg);
    eat_io_auth(socket, function(err, user) {
      if (err) return socket.emit('login to do that');
      io.emit('chat message', user.username + ": " + msg);
    });
  });
});

io.on('disconnect', function(socket){

});
