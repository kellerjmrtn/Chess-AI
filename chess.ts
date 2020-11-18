import { Board } from "./class/board.js";

let game: Board = new Board();
game.beginGame();

document.querySelector("#undo").addEventListener("click", function(){
    game.undoLastMove(true);
})