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
                else {
                    io.to(socket.id).emit('reject', opponent);
                }
            });

            socket.on('establish_pairing', function(opponent) {
                var roomname = "Room " + room_counter;
                socket.join(roomname);
                io.sockets.connected[username_socketid[opponent]].join(roomname);
                room_counter += 1; 
                var gameinfo = {
                    room: roomname,
                    host: opponent,
                    challenger: socketid_username[socket.id],
                    black: username_socketid[opponent],
                    white: socket.id
                };
                io.to(roomname).emit('startgame', gameinfo);

            });

            socket.on('sendreject', function(opponent) {
                io.to(username_socketid[opponent]).emit('reject', socketid_username[socket.id]);
            });

            socket.on("move piece", function(data) {
                io.to(data.room).emit('update board', data.move_data);
            });

    });
};