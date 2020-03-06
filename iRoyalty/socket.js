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
                io.to(username_socketid[opponent]).emit('challenger', socketid_username[socket.id]);
            });

            socket.on('establish_pairing', function(opponent) {
                
                var roomname = "room" + room_counter;
                io.sockets.connected[socket.id].join(roomname);
                io.sockets.connected[username_socketid[opponent]].join(roomname);
                room_counter += 1; 
                socket.to(roomname).broadcast.emit('paired', roomname);
                var room = io.sockets.adapter.rooms[roomname];
                console.log(room.length);
                console.log("user1: " + opponent + " user2: " + socketid_username[socket.id]);
            });
    });
}