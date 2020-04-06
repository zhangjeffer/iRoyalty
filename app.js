// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./helperz/error-handler");
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const socketServer = require("./socket");
const io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));// Routing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/users", require("./users/controllers"));
app.use(errorHandler);
app.use(express.static("."));

app.get("/about",function(req, res){
    res.sendFile(__dirname + "/about.html");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

socketServer(io);

module.exports.server = server.listen(5000, () =>{
    console.log( "Connecting on port 5000" );
});
