// Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const errorHandler = require("./helperz/error-handler");
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const server = http.Server(app);
const io = socketIO(server);app.set('port', 5000);

app.use('/static', express.static(__dirname + '/static'));// Routing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/users", require("./users/controllers"));
app.use(errorHandler);
app.use(express.static("."));

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var socketServer = require("./socket");
socketServer(io);
