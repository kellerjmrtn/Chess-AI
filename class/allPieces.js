import { Piece } from "./piece.js";
export class Pawn extends Piece {
    constructor(color) {
        super(color);
        this.name = "pawn";
        this.value = 1;
        if (color) {
            this.imgFile = "pawn_w.png";
        }
        else {
            this.imgFile = "pawn_b.png";
        }
    }
}
export class King extends Piece {
    constructor(color) {
        super(color);
        this.name = "king";
        this.value = 100;
        if (color) {
            this.imgFile = "king_w.png";
        }
        else {
            this.imgFile = "king_b.png";
        }
    }
}
export class Queen extends Piece {
    constructor(color) {
        super(color);
        this.name = "queen";
        this.value = 9;
        if (color) {
            this.imgFile = "queen_w.png";
        }
        else {
            this.imgFile = "queen_b.png";
        }
    }
}
export class Rook extends Piece {
    constructor(color) {
        super(color);
        this.name = "rook";
        this.value = 5;
        if (color) {
            this.imgFile = "rook_w.png";
        }
        else {
            this.imgFile = "rook_b.png";
        }
    }
}
export class Bishop extends Piece {
    constructor(color) {
        super(color);
        this.name = "bishop";
        this.value = 3;
        if (color) {
            this.imgFile = "bishop_w.png";
        }
        else {
            this.imgFile = "bishop_b.png";
        }
    }
}
export class Knight extends Piece {
    constructor(color) {
        super(color);
        this.name = "knight";
        this.value = 3;
        if (color) {
            this.imgFile = "knight_w.png";
        }
        else {
            this.imgFile = "knight_b.png";
        }
    }
}
