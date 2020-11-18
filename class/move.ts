import { Square } from "./square";
import { Board } from "./board";
import { Piece } from "./piece";

export class Move {
    startRank: number;
    startFile: number;
    endRank: number;
    endFile: number;
    pieceMoved: Piece;
    pieceCaptured: Piece;
    pieceMovedFirstMove: boolean;

    constructor(startSquare: number[], endSquare: number[], board: Board){
        this.startRank = startSquare[0];
        this.startFile = startSquare[1];
        this.endRank = endSquare[0];
        this.endFile = endSquare[1];
        this.pieceMoved = board.squares[this.startRank][this.startFile].contains;
        this.pieceCaptured = board.squares[this.endRank][this.endFile].contains;

        if(this.pieceMoved.hasMoved == false){
            this.pieceMovedFirstMove = true;
        } else {
            this.pieceMovedFirstMove = false;
        }
    }
}