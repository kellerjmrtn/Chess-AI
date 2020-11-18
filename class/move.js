export class Move {
    constructor(startSquare, endSquare, board) {
        this.startRank = startSquare[0];
        this.startFile = startSquare[1];
        this.endRank = endSquare[0];
        this.endFile = endSquare[1];
        this.pieceMoved = board.squares[this.startRank][this.startFile].contains;
        this.pieceCaptured = board.squares[this.endRank][this.endFile].contains;
        if (this.pieceMoved.hasMoved == false) {
            this.pieceMovedFirstMove = true;
        }
        else {
            this.pieceMovedFirstMove = false;
        }
    }
}
