const socket = io();
var game;

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
        alert(opponent + ' rejected or ' + opponent + ' cannot be reached');
});

socket.on('startgame', function(gameinfo) {
        $("#room").html(gameinfo.room);
        if (socket.id === gameinfo.black) {
            startGame("black");
            $("#opponent").html("Opponent: " + gameinfo.challenger); 
            $("#you").html("You: " + gameinfo.host);
            changeTurn(document.getElementById("opponent"));
        }
        else {
            startGame("white");
            $("#opponent").html("Opponent: " + gameinfo.host); 
            $("#you").html("You: " + gameinfo.challenger);
            changeTurn(document.getElementById("you"));
        }
        window.location.href = "#game";
});

function register_user(usr) {
    socket.emit('new player', usr);
}

function find_opponent() {
    var opponent = document.getElementById("find").value;
    alert("Please wait for opponent to accept.  You will be notified promptly.");
    socket.emit("find_opponent", opponent);
}


socket.on('update board', function(move) {
    game.acceptmove(move);
    changeTurn(document.getElementById("opponent"));
    changeTurn(document.getElementById("you"));

});

function startGame(color) {
    if (color === "black") {
        game = new Game("board", "black");
    }
    else {
        game = new Game("board", "white");
    }
}

function dragPieceStart(event) {
    event.dataTransfer.setData("Text", event.target.parentElement.id);
}

function allowDropPiece(event) {
    event.preventDefault();
}
function capturePiece(event) {
    event.preventDefault();
    var to = event.target.parentElement.id;
    var from = event.dataTransfer.getData("Text");
    var move = from + "-" + to;
    var move_data = game.trymove(move);

    var room = document.getElementById("room").innerHTML;
    var data = {
        room: room,
        move_data: move_data
    }

    if(move_data != null){
        socket.emit("move piece", data);
    }    
}

function dropPiece(event) {
    event.preventDefault();
    var to = event.target.id;
    var from = event.dataTransfer.getData("Text");
    var move = from + "-" + to;
    var move_data = game.trymove(move);

    var room = document.getElementById("room").innerHTML;
    var data = {
        room: room,
        move_data: move_data
    }

    if(move_data != null){
        socket.emit("move piece", data);
    }
}

function changeTurn(element) {
    var weight = element.style.fontWeight;
    console.log(weight);
    if (weight === "bold") {
        element.style.fontWeight = "normal";
        element.style.background = "white";
    }
    else {
        element.style.fontWeight = "bold";
        element.style.background = "yellow";
    }
}
