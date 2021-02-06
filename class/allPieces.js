"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Knight = exports.Bishop = exports.Rook = exports.Queen = exports.King = exports.Pawn = void 0;
var piece_js_1 = require("./piece.js");
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(color) {
        var _this = _super.call(this, color) || this;
        _this.name = "pawn";
        _this.value = 1;
        if (color) {
            _this.imgFile = "pawn_w.png";
        }
        else {
            _this.imgFile = "pawn_b.png";
        }
        return _this;
    }
    return Pawn;
}(piece_js_1.Piece));
exports.Pawn = Pawn;
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(color) {
        var _this = _super.call(this, color) || this;
        _this.name = "king";
        _this.value = 100;
        if (color) {
            _this.imgFile = "king_w.png";
        }
        else {
            _this.imgFile = "king_b.png";
        }
        return _this;
    }
    return King;
}(piece_js_1.Piece));
exports.King = King;
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(color) {
        var _this = _super.call(this, color) || this;
        _this.name = "queen";
        _this.value = 9;
        if (color) {
            _this.imgFile = "queen_w.png";
        }
        else {
            _this.imgFile = "queen_b.png";
        }
        return _this;
    }
    return Queen;
}(piece_js_1.Piece));
exports.Queen = Queen;
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(color) {
        var _this = _super.call(this, color) || this;
        _this.name = "rook";
        _this.value = 5;
        if (color) {
            _this.imgFile = "rook_w.png";
        }
        else {
            _this.imgFile = "rook_b.png";
        }
        return _this;
    }
    return Rook;
}(piece_js_1.Piece));
exports.Rook = Rook;
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(color) {
        var _this = _super.call(this, color) || this;
        _this.name = "bishop";
        _this.value = 3;
        if (color) {
            _this.imgFile = "bishop_w.png";
        }
        else {
            _this.imgFile = "bishop_b.png";
        }
        return _this;
    }
    return Bishop;
}(piece_js_1.Piece));
exports.Bishop = Bishop;
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(color) {
        var _this = _super.call(this, color) || this;
        _this.name = "knight";
        _this.value = 3;
        if (color) {
            _this.imgFile = "knight_w.png";
        }
        else {
            _this.imgFile = "knight_b.png";
        }
        return _this;
    }
    return Knight;
}(piece_js_1.Piece));
exports.Knight = Knight;
