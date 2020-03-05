exports = module.exports = function(io){
        io.on('connection', function(socket) {
        });

        setInterval(function() {
            io.sockets.emit('message', 'hi!');
        }, 1000);

        var players = {};

        io.on('connection', function(socket) {
        socket.on('new player', function(data) {
            console.log('new user: ' + data);
        });
    });
}