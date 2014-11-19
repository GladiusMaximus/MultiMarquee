var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sockets = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/reset', function(req, res){
	sockets = [];
	res.redirect('/');
});

io.on('connection', function(socket){
	console.log('a user connected');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
