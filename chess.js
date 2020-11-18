import { Board } from "./class/board.js";
let game = new Board();
game.beginGame();
document.querySelector("#undo").addEventListener("click", function () {
    game.undoLastMove(false);
    game.undoLastMove(true);
});
