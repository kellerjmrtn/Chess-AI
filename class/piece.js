export class Piece {
    constructor(color) {
        this.color = color;
        this.hasMoved = false;
    }
    getInnerHTML(isLegalMove) {
        let str;
        if (isLegalMove) {
            str = '<img class="piece piece-legal-move" src="' + Piece.imgLoc + this.imgFile + '"/>';
        }
        else {
            str = '<img class="piece" src="' + Piece.imgLoc + this.imgFile + '"/>';
        }
        return str;
    }
}
Piece.imgLoc = "./images/";
