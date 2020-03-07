exports = module.exports = function(io){
        var room_counter = 1;

        setInterval(function() {
            io.sockets.emit('message', 'hi!');
        }, 1000);

        var socketid_username = {};
        var username_socketid = {};

        io.on('connection', function(socket) {
            socket.on('new player', function(username) {
                socketid_username[socket.id] = username;
                username_socketid[username] = socket.id;
                console.log(username + " registered with socket.id: " + socket.id);
            });

            socket.on('find_opponent', function(opponent) {
                console.log("find " + opponent);
                if (username_socketid[opponent]) {
                    io.to(username_socketid[opponent]).emit('challenger', socketid_username[socket.id]);
                }
            });

            socket.on('establish_pairing', function(opponent) {
                var roomname = "room" + room_counter;
                socket.join(roomname);
                io.sockets.connected[username_socketid[opponent]].join(roomname);
                room_counter += 1; 
                var gameinfo = {
                    room: roomname,
                    player1: opponent,
                    player2: socketid_username[socket.id]
                };
                io.to(roomname).emit('startgame', gameinfo);

            });

            socket.on('sendreject', function(opponent) {
                io.to(username_socketid[opponent]).emit('reject', socketid_username[socket.id]);
<<<<<<< HEAD
=======
            });

            socket.on("move piece", function(data) {
                console.log(data);
                var move = socketid_username[socket.id] + ": " + data.inputmove;
                io.to(data.room).emit('update board', move);
>>>>>>> de07f89e87da505cae382bf81b39a10d404fea78
            });

            socket.on("move piece", function(data) {
                console.log(data);
                var move = socketid_username[socket.id] + ": " + data.inputmove;
                io.to(data.room).emit('update board', move);
            });

    });
}