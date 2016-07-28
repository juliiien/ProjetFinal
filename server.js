var http = require('http');
var fs = require ('fs');
var express = require('express');
var app = express();
var bodyParser  = require("body-parser");

var urlencoderParser = bodyParser.urlencoded({ extended : false});


var server = http.createServer(function(req, res){
	fs.readFile('./index.html', 'utf-8', function(error, content){
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});


});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket, pseudo){

	socket.on('login',function(login){
		socket.pseudo = login;
	});

	socket.on('message', function (message) {
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
        console.log(message);
    });
	
 	

});

server.listen(80);
