import { Piece } from "./piece.js";

export class Square {
    contains: Piece;
    currLegalMove: boolean;
    rank: number;
    file: number;

    constructor(rank: number, file: number, contains?: Piece){
        this.currLegalMove = false;
        this.rank = rank;
        this.file = file;

        if(typeof contains == "undefined"){
            this.contains = null;
        } else {
            this.contains = contains;
        }
    }

    public getInnerHTML(): string {
        if(this.contains == null){
            if(this.currLegalMove){
                return '<img class="piece" src="./images/legal_move.png"/>';
            }

            return "";
        }

        return this.contains.getInnerHTML(this.currLegalMove);
    }
}