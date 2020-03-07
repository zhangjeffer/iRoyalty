const socket = io();

<<<<<<< HEAD

=======
>>>>>>> de07f89e87da505cae382bf81b39a10d404fea78
socket.on('paired', function(room) { 
    alert('paired to ' + room);
});

socket.on('challenger', function(opponent) { 
    if (confirm(opponent + " wants to challenge you do you accept?")) {
        socket.emit('establish_pairing', opponent);
    } else {
        socket.emit('sendreject', opponent)
    }
});

socket.on('reject', function(opponent) { 
        alert(opponent + ' rejected');
});

socket.on('startgame', function(gameinfo) {
        $("#room").html(gameinfo.room);
        $("#player1").html("Player 1: " + gameinfo.player1); 
        $("#player2").html("Player 2: " + gameinfo.player2); 
        window.location.href = "#game";
});

socket.on('update board', function(move) {
    console.log("updating board");
    var samplechessboard = document.getElementById("samplechessboard");
    samplechessboard.innerHTML += ("<br />" + move);

});

function register_user(usr) {
    socket.emit('new player', usr);
<<<<<<< HEAD

=======
>>>>>>> de07f89e87da505cae382bf81b39a10d404fea78
}

function find_opponent() {
    var opponent = document.getElementById("find").value;
    alert("Please wait for opponent to accept.  You will be notified promptly.");
    socket.emit("find_opponent", opponent);
}

function sendmove() {
    console.log("sending move");
    var room = document.getElementById("room").innerHTML;
    var inputmove = document.getElementById("inputmove").value;
    var data = {
        room: room,
        inputmove: inputmove
    };
    socket.emit('move piece', data);
}
