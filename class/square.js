"use strict";
exports.__esModule = true;
exports.Square = void 0;
var Square = /** @class */ (function () {
    function Square(rank, file, contains) {
        this.currLegalMove = false;
        this.rank = rank;
        this.file = file;
        if (typeof contains == "undefined") {
            this.contains = null;
        }
        else {
            this.contains = contains;
        }
    }
    Square.prototype.getInnerHTML = function () {
        if (this.contains == null) {
            if (this.currLegalMove) {
                return '<img class="piece" src="./images/legal_move.png"/>';
            }
            return "";
        }
        return this.contains.getInnerHTML(this.currLegalMove);
    };
    return Square;
}());
exports.Square = Square;
