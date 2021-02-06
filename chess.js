"use strict";
exports.__esModule = true;
var board_js_1 = require("./class/board.js");
var game = new board_js_1.Board();
game.beginGame();
document.querySelector("#undo").addEventListener("click", function () {
    game.undoLastMove(false);
    game.undoLastMove(true);
});
