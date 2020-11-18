import { Square } from "./square.js";
import { Rook, Knight, Bishop, Queen, King, Pawn } from "./allPieces.js";
import { Move } from "./move.js";
export class Board {
    constructor() {
        this.turn = 0;
        this.squares = this.populateSquares();
        this.isMouseDown = false;
        this.selectedPiece = null;
        this.history = [];
        this.whiteToMove = true;
    }
    addStaticEventListeners() {
        let self = this;
        document.querySelectorAll(".square").forEach(function (item) {
            item.addEventListener("mouseup", function () {
                if (self.selectedPiece != null) {
                    // This code will run when a piece (self.selectedPiece) is attempting to move
                    let id = item.id.split("-")[1];
                    let fileEnd = Number(id[0]) - 1;
                    let rankEnd = Number(id[1]) - 1;
                    id = self.selectedPiece.id.split("-")[1];
                    let fileStart = Number(id[0]) - 1;
                    let rankStart = Number(id[1]) - 1;
                    if (self.getSquare([rankStart, fileStart]).contains.color == self.whiteToMove) {
                        if (!(rankStart == rankEnd && fileStart == fileEnd)) {
                            let move = new Move([rankStart, fileStart], [rankEnd, fileEnd], self);
                            self.attemptMove(move);
                        }
                    }
                    else {
                        console.log("It's not your turn!");
                    }
                }
            });
        });
        document.addEventListener("mouseup", function () {
            self.selectedPiece = null;
        });
    }
    addDynamicEventListeners() {
        let self = this;
        document.querySelectorAll(".piece").forEach(function (item) {
            item.addEventListener("mousedown", function (e) {
                e.preventDefault();
                self.selectedPiece = item.parentElement;
            });
        });
    }
    populateSquares() {
        let squares = [];
        for (let i = 0; i < 8; i++) {
            squares[i] = [];
        }
        squares[0][0] = new Square(0, 0, new Rook(true));
        squares[0][1] = new Square(0, 1, new Knight(true));
        squares[0][2] = new Square(0, 2, new Bishop(true));
        squares[0][3] = new Square(0, 3, new Queen(true));
        squares[0][4] = new Square(0, 4, new King(true));
        squares[0][5] = new Square(0, 5, new Bishop(true));
        squares[0][6] = new Square(0, 6, new Knight(true));
        squares[0][7] = new Square(0, 7, new Rook(true));
        for (let i = 0; i < 8; i++) {
            squares[1][i] = new Square(1, i, new Pawn(true));
        }
        for (let i = 2; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                squares[i][j] = new Square(i, j);
            }
        }
        for (let i = 0; i < 8; i++) {
            squares[6][i] = new Square(6, i, new Pawn(false));
        }
        squares[7][0] = new Square(7, 0, new Rook(false));
        squares[7][1] = new Square(7, 1, new Knight(false));
        squares[7][2] = new Square(7, 2, new Bishop(false));
        squares[7][3] = new Square(7, 3, new Queen(false));
        squares[7][4] = new Square(7, 4, new King(false));
        squares[7][5] = new Square(7, 5, new Bishop(false));
        squares[7][6] = new Square(7, 6, new Knight(false));
        squares[7][7] = new Square(7, 7, new Rook(false));
        return squares;
    }
    refreshBoard(justUndidMove) {
        let element;
        for (let i = 0; i < this.squares.length; i++) {
            for (let j = 0; j < this.squares[i].length; j++) {
                element = document.querySelector("#sq-" + (j + 1) + (i + 1));
                element.innerHTML = this.squares[i][j].getInnerHTML();
            }
        }
        if (!justUndidMove) {
            console.log(this.whiteToMove);
        }
        if (!this.whiteToMove && !justUndidMove) {
            let self = this;
            setTimeout(function () {
                self.takeAIMove();
            }, 10);
        }
        console.log(this.history);
        this.addDynamicEventListeners();
    }
    attemptMove(move) {
        let startSquare = this.squares[move.startRank][move.startFile];
        let endSquare = this.squares[move.endRank][move.endFile];
        let allMoves = this.getAllPossibleMoves();
        // check if move is legal
        if (allMoves.some(function (item) {
            return item.endFile == move.endFile && item.endRank == move.endRank && item.startFile == move.startFile && item.startRank == move.startRank;
        })) {
            console.log("possible move");
            if (startSquare.contains) {
                startSquare.contains.hasMoved = true;
            }
            endSquare.contains = startSquare.contains;
            startSquare.contains = null;
            this.history.push(move);
            this.turn++;
            this.whiteToMove = !this.whiteToMove;
            this.refreshBoard();
        }
        else {
            console.log("Illegal Move attempted");
        }
    }
    getAllPossibleMoves() {
        let allMoves = [];
        let allMovesTemp = [];
        let currentSquare;
        for (let i = 0; i < this.squares.length; i++) {
            for (let j = 0; j < this.squares[i].length; j++) {
                currentSquare = this.squares[i][j];
                //console.log(currentSquare.contains, this.whiteToMove);
                if (currentSquare.contains && currentSquare.contains.color == this.whiteToMove) {
                    allMovesTemp = this.getAllMoves(currentSquare);
                    if (allMovesTemp) {
                        for (let i of allMovesTemp) {
                            allMoves.push(i);
                        }
                    }
                }
            }
        }
        return allMoves;
    }
    getAllMoves(currentSquare) {
        if (currentSquare.contains.name == "pawn") {
            return this.getAllPawnMoves(currentSquare.rank, currentSquare.file);
        }
        else if (currentSquare.contains.name == "rook") {
            return this.getAllRookMoves(currentSquare.rank, currentSquare.file);
        }
        else if (currentSquare.contains.name == "bishop") {
            return this.getAllBishopMoves(currentSquare.rank, currentSquare.file);
        }
        else if (currentSquare.contains.name == "queen") {
            return this.getAllQueenMoves(currentSquare.rank, currentSquare.file);
        }
        else if (currentSquare.contains.name == "king") {
            return this.getAllKingMoves(currentSquare.rank, currentSquare.file);
        }
        else if (currentSquare.contains.name == "knight") {
            return this.getAllKnightMoves(currentSquare.rank, currentSquare.file);
        }
    }
    getAllPawnMoves(rank, file) {
        let possibleMoves = [];
        let squareTemp;
        if (this.whiteToMove) {
            squareTemp = this.getSquareUp([rank, file]);
            if (squareTemp && !this.contains(squareTemp)) {
                possibleMoves.push(new Move([rank, file], [rank + 1, file], this));
            }
            squareTemp = this.getSquareUp(this.getSquareUp([rank, file]));
            if (squareTemp && !this.contains(squareTemp) && !this.hasPieceMoved([rank, file]) && !this.contains(this.getSquareUp([rank, file]))) {
                possibleMoves.push(new Move([rank, file], [rank + 2, file], this));
            }
            squareTemp = this.getSquareRight(this.getSquareUp([rank, file]));
            if (squareTemp && this.contains(squareTemp) && this.contains(squareTemp).color != this.whiteToMove) {
                possibleMoves.push(new Move([rank, file], [rank + 1, file + 1], this));
            }
            squareTemp = this.getSquareLeft(this.getSquareUp([rank, file]));
            if (squareTemp && this.contains(squareTemp) && this.contains(squareTemp).color != this.whiteToMove) {
                possibleMoves.push(new Move([rank, file], [rank + 1, file - 1], this));
            }
        }
        else {
            squareTemp = this.getSquareDown([rank, file]);
            if (squareTemp && !this.contains(squareTemp)) {
                possibleMoves.push(new Move([rank, file], [rank - 1, file], this));
            }
            squareTemp = this.getSquareDown(this.getSquareDown([rank, file]));
            if (squareTemp && !this.contains(squareTemp) && !this.hasPieceMoved([rank, file]) && !this.contains(this.getSquareDown([rank, file]))) {
                possibleMoves.push(new Move([rank, file], [rank - 2, file], this));
            }
            squareTemp = this.getSquareRight(this.getSquareDown([rank, file]));
            if (squareTemp && this.contains(squareTemp) && this.contains(squareTemp).color != this.whiteToMove) {
                possibleMoves.push(new Move([rank, file], [rank - 1, file + 1], this));
            }
            squareTemp = this.getSquareLeft(this.getSquareDown([rank, file]));
            if (squareTemp && this.contains(squareTemp) && this.contains(squareTemp).color != this.whiteToMove) {
                possibleMoves.push(new Move([rank, file], [rank - 1, file - 1], this));
            }
        }
        return possibleMoves;
    }
    getAllRookMoves(rank, file) {
        let possibleMoves = [];
        let squareTemp;
        let squareObjTemp;
        let run;
        // Check Moves in Upward Direction
        run = true;
        squareTemp = [rank, file];
        while (run) {
            squareTemp = this.getSquareUp(squareTemp);
            this.checkLegalMove([rank, file], squareTemp, possibleMoves);
            squareObjTemp = this.getSquare(squareTemp);
            if (!squareTemp || (squareObjTemp && squareObjTemp.contains)) {
                run = false;
            }
        }
        // Check Moves in Downward Direction
        run = true;
        squareTemp = [rank, file];
        while (run) {
            squareTemp = this.getSquareDown(squareTemp);
            this.checkLegalMove([rank, file], squareTemp, possibleMoves);
            squareObjTemp = this.getSquare(squareTemp);
            if (!squareTemp || (squareObjTemp && squareObjTemp.contains)) {
                run = false;
            }
        }
        // Check Moves in Rightward Direction
        run = true;
        squareTemp = [rank, file];
        while (run) {
            squareTemp = this.getSquareRight(squareTemp);
            this.checkLegalMove([rank, file], squareTemp, possibleMoves);
            squareObjTemp = this.getSquare(squareTemp);
            if (!squareTemp || (squareObjTemp && squareObjTemp.contains)) {
                run = false;
            }
        }
        // Check Moves in Leftward Direction
        run = true;
        squareTemp = [rank, file];
        while (run) {
            squareTemp = this.getSquareLeft(squareTemp);
            this.checkLegalMove([rank, file], squareTemp, possibleMoves);
            squareObjTemp = this.getSquare(squareTemp);
            if (!squareTemp || (squareObjTemp && squareObjTemp.contains)) {
                run = false;
            }
        }
        return possibleMoves;
    }
    getAllBishopMoves(rank, file) {
        let possibleMoves = [];
        let squareTemp;
        let squareObjTemp;
        let run;
        // Check Moves in Upward-Rightward Direction
        run = true;
        squareTemp = [rank, file];
        while (run) {
            squareTemp = this.getSquareRight(this.getSquareUp(squareTemp));
            this.checkLegalMove([rank, file], squareTemp, possibleMoves);
            squareObjTemp = this.getSquare(squareTemp);
            if (!squareTemp || (squareObjTemp && squareObjTemp.contains)) {
                run = false;
            }
        }
        // Check Moves in Upward-Leftward Direction
        run = true;
        squareTemp = [rank, file];
        while (run) {
            squareTemp = this.getSquareLeft(this.getSquareUp(squareTemp));
            this.checkLegalMove([rank, file], squareTemp, possibleMoves);
            squareObjTemp = this.getSquare(squareTemp);
            if (!squareTemp || (squareObjTemp && squareObjTemp.contains)) {
                run = false;
            }
        }
        // Check Moves in Downward-Rightward Direction
        run = true;
        squareTemp = [rank, file];
        while (run) {
            squareTemp = this.getSquareRight(this.getSquareDown(squareTemp));
            this.checkLegalMove([rank, file], squareTemp, possibleMoves);
            squareObjTemp = this.getSquare(squareTemp);
            if (!squareTemp || (squareObjTemp && squareObjTemp.contains)) {
                run = false;
            }
        }
        // Check Moves in Downward-Leftward Direction
        run = true;
        squareTemp = [rank, file];
        while (run) {
            squareTemp = this.getSquareLeft(this.getSquareDown(squareTemp));
            this.checkLegalMove([rank, file], squareTemp, possibleMoves);
            squareObjTemp = this.getSquare(squareTemp);
            if (!squareTemp || (squareObjTemp && squareObjTemp.contains)) {
                run = false;
            }
        }
        return possibleMoves;
    }
    getAllQueenMoves(rank, file) {
        let possibleMoves = this.getAllRookMoves(rank, file);
        let possibleBishopMoves = this.getAllBishopMoves(rank, file);
        let len = possibleBishopMoves.length;
        for (let i = 0; i < len; i++) {
            possibleMoves.push(possibleBishopMoves[i]);
        }
        return possibleMoves;
    }
    getAllKingMoves(rank, file) {
        let possibleMoves = [];
        let squareTemp;
        squareTemp = this.getSquareUp([rank, file]);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareDown([rank, file]);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareRight([rank, file]);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareLeft([rank, file]);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareUp(this.getSquareRight([rank, file]));
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareUp(this.getSquareLeft([rank, file]));
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareDown(this.getSquareRight([rank, file]));
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareDown(this.getSquareLeft([rank, file]));
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        return possibleMoves;
    }
    getAllKnightMoves(rank, file) {
        let possibleMoves = [];
        let squareTemp;
        let squareTemp2;
        squareTemp2 = this.getSquareUp(this.getSquareUp([rank, file]));
        squareTemp = this.getSquareRight(squareTemp2);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareLeft(squareTemp2);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp2 = this.getSquareDown(this.getSquareDown([rank, file]));
        squareTemp = this.getSquareRight(squareTemp2);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareLeft(squareTemp2);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp2 = this.getSquareRight(this.getSquareRight([rank, file]));
        squareTemp = this.getSquareUp(squareTemp2);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareDown(squareTemp2);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp2 = this.getSquareLeft(this.getSquareLeft([rank, file]));
        squareTemp = this.getSquareUp(squareTemp2);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        squareTemp = this.getSquareDown(squareTemp2);
        this.checkLegalMove([rank, file], squareTemp, possibleMoves);
        return possibleMoves;
    }
    checkLegalMove(squareStart, squareEnd, possibleMoves) {
        if (this.getSquare(squareEnd) && (!this.contains(squareEnd) || this.contains(squareEnd).color != this.whiteToMove)) {
            possibleMoves.push(new Move(squareStart, squareEnd, this));
        }
    }
    getSquare(square) {
        // returns the square object located at the givven coordinates
        if (square && this.squares[square[0]]) {
            return this.squares[square[0]][square[1]];
        }
        else {
            return null;
        }
    }
    getSquareUp(square) {
        if (square && this.squares[square[0] + 1]) {
            return [square[0] + 1, square[1]];
        }
        else {
            return null;
        }
    }
    getSquareDown(square) {
        if (square && this.squares[square[0] - 1]) {
            return [square[0] - 1, square[1]];
        }
        else {
            return null;
        }
    }
    getSquareRight(square) {
        if (square && this.squares[square[1] + 1]) {
            return [square[0], square[1] + 1];
        }
        else {
            return null;
        }
    }
    getSquareLeft(square) {
        if (square && this.squares[square[1] - 1]) {
            return [square[0], square[1] - 1];
        }
        else {
            return null;
        }
    }
    contains(square) {
        if (square && square.length == 2 && this.squares[square[0]] && this.squares[square[0]][square[1]] && this.squares[square[0]][square[1]].contains) {
            return this.squares[square[0]][square[1]].contains;
        }
        else {
            return null;
        }
    }
    hasPieceMoved(square) {
        if (square) {
            let squareRank = this.squares[square[0]];
            let file = square[1];
            if (squareRank && squareRank[file] && squareRank[file].contains && squareRank[file].contains.hasMoved) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    undoLastMove(refreshBoard) {
        let lastMove = this.history.pop();
        let startSquare = this.squares[lastMove.endRank][lastMove.endFile];
        let endSquare = this.squares[lastMove.startRank][lastMove.startFile];
        if (startSquare.contains) {
            if (lastMove.pieceMovedFirstMove) {
                startSquare.contains.hasMoved = false;
            }
        }
        endSquare.contains = lastMove.pieceMoved;
        startSquare.contains = lastMove.pieceCaptured;
        this.turn--;
        this.whiteToMove = !this.whiteToMove;
        if (refreshBoard) {
            this.refreshBoard(true);
        }
    }
    static evaluatePosition(boardState, depth, currentPlayer) {
        if (depth == 0) {
            return Board.evaluateSingularPosition(boardState);
        }
        if (currentPlayer) {
            let maxEval = -1000000;
            let evaluation = 0;
            let allPossibleMoves = boardState.getAllPossibleMoves();
            let len = allPossibleMoves.length;
            for (let i = 0; i < len; i++) {
                evaluation = Board.evaluatePosition(Board.applyMoveToBoard(boardState, allPossibleMoves[i]), depth - 1, false);
                boardState.undoLastMove(false);
                maxEval = Math.max(maxEval, evaluation);
            }
            return maxEval;
        }
        else {
            let minEval = 1000000;
            let evaluation = 0;
            let allPossibleMoves = boardState.getAllPossibleMoves();
            let len = allPossibleMoves.length;
            for (let i = 0; i < len; i++) {
                evaluation = Board.evaluatePosition(Board.applyMoveToBoard(boardState, allPossibleMoves[i]), depth - 1, true);
                boardState.undoLastMove(false);
                minEval = Math.min(minEval, evaluation);
            }
            return minEval;
        }
    }
    static evaluateSingularPosition(boardState) {
        let len = boardState.squares.length;
        let len2;
        let contains;
        let tempScore;
        let totalBoardScore = 0;
        for (let i = 0; i < len; i++) {
            len2 = boardState.squares[i].length;
            for (let j = 0; j < len2; j++) {
                contains = boardState.contains([i, j]);
                if (contains) {
                    tempScore = 0;
                    if (contains.name == "pawn") {
                        tempScore = 1;
                    }
                    else if (contains.name == "knight" || contains.name == "bishop") {
                        tempScore = 3;
                    }
                    else if (contains.name == "rook") {
                        tempScore = 5;
                    }
                    else if (contains.name == "queen") {
                        tempScore = 9;
                    }
                    else if (contains.name == "king") {
                        tempScore = 100;
                    }
                    if (!contains.color) {
                        tempScore *= -1;
                    }
                    totalBoardScore += tempScore;
                }
            }
        }
        return totalBoardScore;
    }
    static applyMoveToBoard(boardState, move) {
        // assume legal boardState!!!
        let startSquare = boardState.squares[move.startRank][move.startFile];
        let endSquare = boardState.squares[move.endRank][move.endFile];
        if (startSquare.contains) {
            startSquare.contains.hasMoved = true;
        }
        endSquare.contains = startSquare.contains;
        startSquare.contains = null;
        boardState.history.push(move);
        boardState.turn++;
        boardState.whiteToMove = !boardState.whiteToMove;
        return boardState;
    }
    takeAIMove() {
        // assume AI is black
        let allPossibleMoves = this.getAllPossibleMoves();
        let len = allPossibleMoves.length;
        let minEval = 1000000;
        let evaluation;
        let currentBestMoves = [];
        for (let i = 0; i < len; i++) {
            evaluation = Board.evaluatePosition(Board.applyMoveToBoard(this, allPossibleMoves[i]), 3, true);
            if (evaluation < minEval) {
                minEval = evaluation;
                currentBestMoves = [];
                currentBestMoves.push(allPossibleMoves[i]);
            }
            else if (evaluation == minEval) {
                currentBestMoves.push(allPossibleMoves[i]);
            }
            this.undoLastMove(false);
        }
        this.attemptMove(currentBestMoves[Math.floor(Math.random() * currentBestMoves.length)]);
    }
    beginGame() {
        this.refreshBoard();
        this.addStaticEventListeners();
    }
}
