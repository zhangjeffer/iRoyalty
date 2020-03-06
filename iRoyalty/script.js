const socket = io();

function register_user(usr) {
    socket.emit('new player', usr);

    socket.on('paired', function(room) { 
        alert('paired to ' + room);
    });

    socket.on('challenger', function(opponent) { 
        var response = prompt(opponent + " wants to challenge you do you accept?");
        if (response == "yes") {
            socket.emit('establish_pairing', opponent);
        } else {
            socket.emit('reject', opponent)
        }
    });
}

function find_opponent() {
    var opponent = document.getElementById("find").value;
    alert(opponent);
    socket.emit("find_opponent", opponent);
    socket.on('reject', function(opponent) { 
        alert(opponent + ' rejected');
    });
}
