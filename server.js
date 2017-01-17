var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');

var messages = [];

// set up to accept json as parameters
app.use(bodyParser.json());

// @NOTE: do this if you want to change the default directory for views, which is /views
app.set('views', path.join(__dirname, '/templates'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the static path (for css, js, etc.)
app.use('/css', express.static(path.join(__dirname, 'public/css')));

// routes via express
app.get('/', function(req, res) {
  res.render('index');
});

// socket.io functionality
io.on('connection', function(socket) {
  var myUser = null;

  socket.on('new user', function(user) {
    myUser = user;
    // new user logged in, send all msgs to the new user
    socket.emit('load messages', messages);

    console.log('Client "' + myUser.name + '" connected.');
  });

  socket.on('send message', function(message) {
    if (myUser !== null) {
      message.senderName = myUser.name;
      socket.broadcast.emit('new message', message);
      messages.push(message);
    }
  });

  socket.on('disconnect', function() {
    if (myUser !== null) {
      console.log('Client "' + myUser.name + '" disconnected.');
    }
  });
});

http.listen(8080);
console.log("Listening on port 8080...");