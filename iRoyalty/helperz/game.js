function Game(boardID, boardColor, position){
    var chess = (position == null) ?  Chess() : Chess(position) ;
    var board = new ChessBoard(boardID, {
        color : boardColor
        ,position: position
        //Uncomment to enableplayer to drag both color pieces
        //,test:true
    });

    
    function promotionNeeded(move){
        return move.san.includes("=Q");
    }

    return {
        /* Will just run the move, no questions asked. See input below

            move = {
                from: "e2",
                to: "e4",
                promotion: 'q'
            }
        
        */
        acceptmove:function(move){
            chess.move(move);
            this.update();

        },
        /* Make sure the move make sense before updating the dom, do nothing if move is illegal 

            Also, handles promotion
        
        */
        trymove:function(move){
            cooridinates = move.split("-");
            move_made = chess.move({
                from:cooridinates[0],
                to:cooridinates[1],

                // Put a mock promotion that we will undo if needed
                promotion:'q'
            })
            if(move_made != null){

                // Handle promotion by undoing
                if (promotionNeeded(move_made)){
                    chess.undo();
                    var promotion_piece;
                    while (true){
                        promotion_piece = prompt("What do you want to promote to?\n Options are 'b', 'n', 'q', 'r'", 'q');

                        if (promotion_piece === 'b' || promotion_piece === 'n' || promotion_piece === 'q' || promotion_piece === 'r'){
                            this.acceptmove({
                                from:cooridinates[0],
                                to:cooridinates[1],
                                promotion:promotion_piece
                            });
                            break;
                        }
                    }
                }else{
                    this.update();
                }
            }
        },
        update:function(){
            board.update(chess.fen());
            if (chess.in_checkmate()){
                alert("Checkmate!")
            }else if(chess.in_stalemate()){
                alert("Stalemate!");
            }else if(chess.in_check()){
                alert("Check!");
            }else if(chess.in_draw()){
                alert("Draw!")
            }
        }
    }
}