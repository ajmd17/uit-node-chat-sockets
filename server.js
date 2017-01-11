var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');

// your default messages and users array: this is where you'll store your messages and users
var messages = [];
var users = [];

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

	// @TODO: add your ejs rendering code here! Remember, this has been done many times
	//		  before by many other people, so Google is your friend!
});


// socket.io functionality
io.on('connection', function(socket){
  console.log('Socket user connected!');

  // @TODO: set up your send message, show messages and add username functions.
  //		Remember, there is a video on all of this stuff that we watched!

});

http.listen(8080);
console.log("Listening on port 8080...");