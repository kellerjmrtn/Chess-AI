"use strict";
exports.__esModule = true;
exports.Move = void 0;
var Move = /** @class */ (function () {
    function Move(startSquare, endSquare, board) {
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
        var king = board.squares[0][4].contains;
        var rookKing = board.squares[0][7].contains;
        var rookQueen = board.squares[0][0].contains;
        this.castleQueenSide = false;
        this.castleKingSide = false;
        if (this.pieceMoved.name == "king" && king && !king.hasMoved) {
            if (rookKing && !rookKing.hasMoved && this.endRank == 0 && this.endFile == 6) {
                this.castleKingSide = true;
            }
            if (rookQueen && !rookQueen.hasMoved && endSquare == [0, 2]) {
                this.castleQueenSide = true;
            }
        }
    }
    return Move;
}());
exports.Move = Move;
