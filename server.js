var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash-node');

var DELAY_MILIS = 100;
var TIME_DURATION = 10000;
var OFFSET_MILIS = [500];
var CTR = 0;

var sockets = [];

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/reset', function(req, res) {
	sockets = [];
	res.redirect('/');
});

io.on('connection', function(socket) {
	socket.offset = sockets.length;
	console.log('user ' + socket.offset + ' connected');
	sockets.push(socket);

	setTimeout(function () {
		socket.emit('time', {
			'offset': OFFSET_MILIS[socket.offset] + (new Date().getTime() % TIME_DURATION)
		});
		console.log(OFFSET_MILIS[socket.offset] + (new Date().getTime() % TIME_DURATION));
	}, DELAY_MILIS);

	socket.on('disconnect', function(){
		console.log('user ' + socket.offset + ' disconnected');
		_.pull(sockets, socket);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
