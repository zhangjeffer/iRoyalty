
const ROWS = 8;
const COLUMNS = 8;
const letters = "abcdefgh";
const start = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";


function ChessBoard(boardId, options){
    var boardDiv = $("#" + boardId);
    var color = options.color;
    var position = (options.position == null) ? start :  options.position;
    var allowBothSides = (options.test == null) ? false: options.test;
    

    function getImage(letter){
        switch(letter){
            case "b":
                return "bB.png";
            case "B":
                return "wB.png";
            case "k":
                return "bK.png";
            case "K":
                return "wK.png";
            case "n":
                return "bN.png";
            case "N":
                return "wN.png";
            case "p":
                return "bP.png";
            case "P":
                return "wP.png";
            case "q":
                return "bQ.png";
            case "Q":
                return "wQ.png";
            case "r":
                return "bR.png";
            case "R":
                return "wR.png";
            default:
                return null;
        }
    }
    function getPerspectiveHtml(FEN, color){
        var boardHtml = "";
        var white = color === "white";
        var fen_letters;
        if (white){
            fen_letters = FEN.split("/").join("");
        }else{
            fen_letters = FEN.split("/").join("").split(" ")[0].split("").reverse().join("");
        }
        var f = 0;
        var space_count = 0;
    
        for(var i = (white) ? (ROWS - 1) : 0; 0 <= i && i < ROWS; i += ((white) ? -1 : 1) ){
    
            boardHtml += "<div class=\"row\">";
            for(var j = (white) ? 0 : (COLUMNS - 1); 0 <= j && j < COLUMNS; j += (white) ? 1 : -1  ){
                var id = letters[j] + (i + 1);
                var class_name = ( (i + j + 1) % 2 === 0 ) ? "dark-square" : "light-square";
                            
                boardHtml += "<div ondrop=\"dropPiece(event)\" ondragover=\"allowDropPiece(event)\" id=\"" + id + "\" class=\"square " + class_name + "\">";
                if (space_count === 0){
                    var draggable = "true";
                    var image = getImage(fen_letters[f]);
                    if (image === null){
                        space_count = parseInt(fen_letters[f]);
                        space_count--;
                    }else{
                        if( (!allowBothSides) && (( image[0] === "w" && !white) || (image[0] === "b" && white )) ){ draggable = "false"; }
                        boardHtml += "<img ondrop=\"capturePiece(event)\" ondragstart=\"dragPieceStart(event)\" draggable=\"" + draggable + "\" class=\"piece\" src=\"/images/" + image + "\"/>";
                    }
                    f++;
                }else{
                    space_count --;
                }
                boardHtml += "</div>";
            }
            boardHtml += "</div>";
        }
    
        return boardHtml;
    }

    boardHtml = getPerspectiveHtml(position, color);

    boardDiv.html(boardHtml);

    return{
        update(FEN){
            boardDiv.html(getPerspectiveHtml(FEN, color));
        },
        color(){
            return color;
        }
    };
}


