var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var listen = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {

	console.log("Index");
});

io.on('connection', function(socket) {

	console.log("A user has connected");

	socket.on('disconnect', function() {

		console.log("A user has disconnected");
	});

	socket.on('username', function(username) {

		socket.username = username;
		console.log("A new user named" +username+ "Has joined");


	});

	socket.on('message',function(data) {
		socket.broadcast.emit('message', function(username) {
			username: socket.username;
			message: data;
		});
	})

});


	http.listen(listen, function() {
		console.log("Server runnin at "+listen);
	})