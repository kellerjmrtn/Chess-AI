"use strict";
exports.__esModule = true;
exports.Piece = void 0;
var Piece = /** @class */ (function () {
    function Piece(color) {
        this.color = color;
        this.hasMoved = false;
    }
    Piece.prototype.getInnerHTML = function (isLegalMove) {
        var str;
        if (isLegalMove) {
            str = '<img class="piece piece-legal-move" src="' + Piece.imgLoc + this.imgFile + '"/>';
        }
        else {
            str = '<img class="piece" src="' + Piece.imgLoc + this.imgFile + '"/>';
        }
        return str;
    };
    Piece.imgLoc = "./images/";
    return Piece;
}());
exports.Piece = Piece;
