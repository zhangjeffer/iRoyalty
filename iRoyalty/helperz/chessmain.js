var game;

$(document).ready( function() {

    // To test promotion
    //game = new Game("board", "white", "1k6/6P1/8/8/8/8/8/1K6 w - - 0 1");

    // To test stalemate
    //game = new Game("board", "white", "7k/7P/8/7K/8/8/8/8 w - - 0 1");
    
    game = new Game("board", "white");
});

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
    console.log(move); 
    game.trymove(move);
}

function dropPiece(event) {
    event.preventDefault();
    var to = event.target.id;
    var from = event.dataTransfer.getData("Text");
    var move = from + "-" + to;
    console.log(move); 
    var move_data = game.trymove(move);

    if(move_data != null){
        // emit move_data
    }
}
