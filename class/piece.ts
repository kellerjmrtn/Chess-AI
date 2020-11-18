
export class Piece {

    name: string;
    color: boolean; // false if BLACK
    static imgLoc: string = "./images/";
    imgFile: string;
    value: number;
    hasMoved: boolean;

    constructor(color: boolean){
        this.color = color;
        this.hasMoved = false;
    }

    public getInnerHTML(isLegalMove: boolean): string {
        let str: string; 
        if(isLegalMove){
            str = '<img class="piece piece-legal-move" src="' + Piece.imgLoc + this.imgFile + '"/>';
        } else {
            str = '<img class="piece" src="' + Piece.imgLoc + this.imgFile + '"/>';
        }

        return str;
    } 
}