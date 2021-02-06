"use strict";
exports.__esModule = true;
exports.Board = void 0;
var square_js_1 = require("./square.js");
var allPieces_js_1 = require("./allPieces.js");
var move_js_1 = require("./move.js");
var Board = /** @class */ (function () {
    function Board() {
        this.turn = 0;
        this.squares = this.populateSquares();
        this.isMouseDown = false;
        this.selectedPiece = null;
        this.history = [];
        this.whiteToMove = true;
        this.whiteHasCastled = false;
        this.blackHasCastled = false;
    }
    Board.prototype.addStaticEventListeners = function () {
        var self = this;
        document.querySelectorAll(".square").forEach(function (item) {
            item.addEventListener("mouseup", function () {
                if (self.selectedPiece != null) {
                    // This code will run when a piece (self.selectedPiece) is attempting to move
                    var id = item.id.split("-")[1];
                    var fileEnd = Number(id[0]) - 1;
                    var rankEnd = Number(id[1]) - 1;
                    id = self.selectedPiece.id.split("-")[1];
                    var fileStart = Number(id[0]) - 1;
                    var rankStart = Number(id[1]) - 1;
                    if (self.getSquare([rankStart, fileStart]).contains.color == self.whiteToMove) {
                        if (!(rankStart == rankEnd && fileStart == fileEnd)) {
                            var move = new move_js_1.Move([rankStart, fileStart], [rankEnd, fileEnd], self);
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
    };
    Board.prototype.addDynamicEventListeners = function () {
        var self = this;
        document.querySelectorAll(".piece").forEach(function (item) {
            item.addEventListener("mousedown", function (e) {
                e.preventDefault();
                self.selectedPiece = item.parentElement;
            });
        });
    };
    Board.prototype.populateSquares = function () {
        var squares = [];
        for (var i = 0; i < 8; i++) {
            squares[i] = [];
        }
        squares[0][0] = new square_js_1.Square(0, 0, new allPieces_js_1.Rook(true));
        squares[0][1] = new square_js_1.Square(0, 1, new allPieces_js_1.Knight(true));
        squares[0][2] = new square_js_1.Square(0, 2, new allPieces_js_1.Bishop(true));
        squares[0][3] = new square_js_1.Square(0, 3, new allPieces_js_1.Queen(true));
        squares[0][4] = new square_js_1.Square(0, 4, new allPieces_js_1.King(true));
        squares[0][5] = new square_js_1.Square(0, 5, new allPieces_js_1.Bishop(true));
        squares[0][6] = new square_js_1.Square(0, 6, new allPieces_js_1.Knight(true));
        squares[0][7] = new square_js_1.Square(0, 7, new allPieces_js_1.Rook(true));
        for (var i = 0; i < 8; i++) {
            squares[1][i] = new square_js_1.Square(1, i, new allPieces_js_1.Pawn(true));
        }
        for (var i = 2; i < 6; i++) {
            for (var j = 0; j < 8; j++) {
                squares[i][j] = new square_js_1.Square(i, j);
            }
        }
        for (var i = 0; i < 8; i++) {
            squares[6][i] = new square_js_1.Square(6, i, new allPieces_js_1.Pawn(false));
        }
        squares[7][0] = new square_js_1.Square(7, 0, new allPieces_js_1.Rook(false));
        squares[7][1] = new square_js_1.Square(7, 1, new allPieces_js_1.Knight(false));
        squares[7][2] = new square_js_1.Square(7, 2, new allPieces_js_1.Bishop(false));
        squares[7][3] = new square_js_1.Square(7, 3, new allPieces_js_1.Queen(false));
        squares[7][4] = new square_js_1.Square(7, 4, new allPieces_js_1.King(false));
        squares[7][5] = new square_js_1.Square(7, 5, new allPieces_js_1.Bishop(false));
        squares[7][6] = new square_js_1.Square(7, 6, new allPieces_js_1.Knight(false));
        squares[7][7] = new square_js_1.Square(7, 7, new allPieces_js_1.Rook(false));
        return squares;
    };
    Board.prototype.refreshBoard = function (justUndidMove) {
        var element;
        for (var i = 0; i < this.squares.length; i++) {
            for (var j = 0; j < this.squares[i].length; j++) {
                element = document.querySelector("#sq-" + (j + 1) + (i + 1));
                element.innerHTML = this.squares[i][j].getInnerHTML();
            }
        }
        if (!this.whiteToMove && !justUndidMove) {
            var self_1 = this;
            setTimeout(function () {
                self_1.takeAIMove();
            }, 10);
        }
        this.addDynamicEventListeners();
    };
    Board.prototype.attemptMove = function (move) {
        var startSquare = this.squares[move.startRank][move.startFile];
        var endSquare = this.squares[move.endRank][move.endFile];
        var allMoves = this.getAllPossibleMoves();
        // check if move is legal
        if (allMoves.some(function (item) {
            return item.endFile == move.endFile && item.endRank == move.endRank && item.startFile == move.startFile && item.startRank == move.startRank;
        })) {
            //console.log("possible move");
            if (startSquare.contains) {
                startSquare.contains.hasMoved = true;
            }
            if (move.castleKingSide) {
                var rookSquare = this.getSquare([0, 7]);
                this.getSquare([0, 5]).contains = rookSquare.contains;
                rookSquare.contains = null;
                if (this.whiteToMove) {
                    this.whiteHasCastled = true;
                }
                else {
                    this.blackHasCastled = true;
                }
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
    };
    Board.prototype.getAllPossibleMoves = function () {
        var allMoves = [];
        var allMovesTemp = [];
        var currentSquare;
        for (var i = 0; i < this.squares.length; i++) {
            for (var j = 0; j < this.squares[i].length; j++) {
                currentSquare = this.squares[i][j];
                //console.log(currentSquare.contains, this.whiteToMove);
                if (currentSquare.contains && currentSquare.contains.color == this.whiteToMove) {
                    allMovesTemp = this.getAllMoves(currentSquare);
                    if (allMovesTemp) {
                        for (var _i = 0, allMovesTemp_1 = allMovesTemp; _i < allMovesTemp_1.length; _i++) {
                            var i_1 = allMovesTemp_1[_i];
                            allMoves.push(i_1);
                        }
                    }
                }
            }
        }
        return allMoves;
    };
    Board.prototype.getAllMoves = function (currentSquare) {
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
    };
    Board.prototype.getAllPawnMoves = function (rank, file) {
        var possibleMoves = [];
        var squareTemp;
        if (this.whiteToMove) {
            squareTemp = this.getSquareUp([rank, file]);
            if (squareTemp && !this.contains(squareTemp)) {
                possibleMoves.push(new move_js_1.Move([rank, file], [rank + 1, file], this));
            }
            squareTemp = this.getSquareUp(this.getSquareUp([rank, file]));
            if (squareTemp && !this.contains(squareTemp) && !this.hasPieceMoved([rank, file]) && !this.contains(this.getSquareUp([rank, file]))) {
                possibleMoves.push(new move_js_1.Move([rank, file], [rank + 2, file], this));
            }
            squareTemp = this.getSquareRight(this.getSquareUp([rank, file]));
            if (squareTemp && this.contains(squareTemp) && this.contains(squareTemp).color != this.whiteToMove) {
                possibleMoves.push(new move_js_1.Move([rank, file], [rank + 1, file + 1], this));
            }
            squareTemp = this.getSquareLeft(this.getSquareUp([rank, file]));
            if (squareTemp && this.contains(squareTemp) && this.contains(squareTemp).color != this.whiteToMove) {
                possibleMoves.push(new move_js_1.Move([rank, file], [rank + 1, file - 1], this));
            }
        }
        else {
            squareTemp = this.getSquareDown([rank, file]);
            if (squareTemp && !this.contains(squareTemp)) {
                possibleMoves.push(new move_js_1.Move([rank, file], [rank - 1, file], this));
            }
            squareTemp = this.getSquareDown(this.getSquareDown([rank, file]));
            if (squareTemp && !this.contains(squareTemp) && !this.hasPieceMoved([rank, file]) && !this.contains(this.getSquareDown([rank, file]))) {
                possibleMoves.push(new move_js_1.Move([rank, file], [rank - 2, file], this));
            }
            squareTemp = this.getSquareRight(this.getSquareDown([rank, file]));
            if (squareTemp && this.contains(squareTemp) && this.contains(squareTemp).color != this.whiteToMove) {
                possibleMoves.push(new move_js_1.Move([rank, file], [rank - 1, file + 1], this));
            }
            squareTemp = this.getSquareLeft(this.getSquareDown([rank, file]));
            if (squareTemp && this.contains(squareTemp) && this.contains(squareTemp).color != this.whiteToMove) {
                possibleMoves.push(new move_js_1.Move([rank, file], [rank - 1, file - 1], this));
            }
        }
        return possibleMoves;
    };
    Board.prototype.getAllRookMoves = function (rank, file) {
        var possibleMoves = [];
        var squareTemp;
        var squareObjTemp;
        var run;
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
    };
    Board.prototype.getAllBishopMoves = function (rank, file) {
        var possibleMoves = [];
        var squareTemp;
        var squareObjTemp;
        var run;
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
    };
    Board.prototype.getAllQueenMoves = function (rank, file) {
        var possibleMoves = this.getAllRookMoves(rank, file);
        var possibleBishopMoves = this.getAllBishopMoves(rank, file);
        var len = possibleBishopMoves.length;
        for (var i = 0; i < len; i++) {
            possibleMoves.push(possibleBishopMoves[i]);
        }
        return possibleMoves;
    };
    Board.prototype.getAllKingMoves = function (rank, file) {
        var possibleMoves = [];
        var squareTemp;
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
        // Castling
        if (this.getSquare([rank, file]).contains.hasMoved == false) {
            // Kingside Castle
            squareTemp = this.getSquareRight([rank, file]);
            if (squareTemp && !this.getSquare(squareTemp).contains) {
                squareTemp = this.getSquareRight(squareTemp);
                if (squareTemp && !this.getSquare(squareTemp).contains) {
                    squareTemp = this.getSquareRight(squareTemp);
                    if (squareTemp && this.getSquare(squareTemp).contains && this.getSquare(squareTemp).contains.name == "rook" && this.getSquare(squareTemp).contains.hasMoved == false) {
                        possibleMoves.push(new move_js_1.Move([rank, file], [rank, file + 2], this));
                    }
                }
            }
        }
        return possibleMoves;
    };
    Board.prototype.getAllKnightMoves = function (rank, file) {
        var possibleMoves = [];
        var squareTemp;
        var squareTemp2;
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
    };
    Board.prototype.checkLegalMove = function (squareStart, squareEnd, possibleMoves) {
        if (this.getSquare(squareEnd) && (!this.contains(squareEnd) || this.contains(squareEnd).color != this.whiteToMove)) {
            possibleMoves.push(new move_js_1.Move(squareStart, squareEnd, this));
        }
    };
    Board.prototype.getSquare = function (square) {
        // returns the square object located at the givven coordinates
        if (square && this.squares[square[0]]) {
            return this.squares[square[0]][square[1]];
        }
        else {
            return null;
        }
    };
    Board.prototype.getSquareUp = function (square) {
        if (square && this.squares[square[0] + 1]) {
            return [square[0] + 1, square[1]];
        }
        else {
            return null;
        }
    };
    Board.prototype.getSquareDown = function (square) {
        if (square && this.squares[square[0] - 1]) {
            return [square[0] - 1, square[1]];
        }
        else {
            return null;
        }
    };
    Board.prototype.getSquareRight = function (square) {
        if (square && this.squares[square[1] + 1]) {
            return [square[0], square[1] + 1];
        }
        else {
            return null;
        }
    };
    Board.prototype.getSquareLeft = function (square) {
        if (square && this.squares[square[1] - 1]) {
            return [square[0], square[1] - 1];
        }
        else {
            return null;
        }
    };
    Board.prototype.contains = function (square) {
        if (square && square.length == 2 && this.squares[square[0]] && this.squares[square[0]][square[1]] && this.squares[square[0]][square[1]].contains) {
            return this.squares[square[0]][square[1]].contains;
        }
        else {
            return null;
        }
    };
    Board.prototype.hasPieceMoved = function (square) {
        if (square) {
            var squareRank = this.squares[square[0]];
            var file = square[1];
            if (squareRank && squareRank[file] && squareRank[file].contains && squareRank[file].contains.hasMoved) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    Board.prototype.undoLastMove = function (refreshBoard) {
        var lastMove = this.history.pop();
        var startSquare = this.squares[lastMove.endRank][lastMove.endFile];
        var endSquare = this.squares[lastMove.startRank][lastMove.startFile];
        if (startSquare.contains) {
            if (lastMove.pieceMovedFirstMove) {
                startSquare.contains.hasMoved = false;
            }
        }
        if (lastMove.castleKingSide) {
            this.getSquare([0, 7]).contains = this.getSquare([0, 5]).contains;
            this.getSquare([0, 7]).contains.hasMoved = false;
            this.getSquare([0, 5]).contains = null;
            if (lastMove.pieceMoved.color) {
                this.whiteHasCastled = false;
            }
            else {
                this.blackHasCastled = false;
            }
        }
        endSquare.contains = lastMove.pieceMoved;
        startSquare.contains = lastMove.pieceCaptured;
        this.turn--;
        this.whiteToMove = !this.whiteToMove;
        if (refreshBoard) {
            this.refreshBoard(true);
        }
    };
    Board.evaluatePosition = function (boardState, depth, alpha, beta, currentPlayer) {
        if (depth == 0) {
            return Board.evaluateSingularPosition(boardState);
        }
        if (currentPlayer) {
            var maxEval = -1000000;
            var evaluation = 0;
            var allPossibleMoves = boardState.getAllPossibleMoves();
            var len = allPossibleMoves.length;
            for (var i = 0; i < len; i++) {
                if (allPossibleMoves[i].pieceCaptured) {
                    evaluation = Board.evaluatePosition(Board.applyMoveToBoard(boardState, allPossibleMoves[i]), depth, alpha, beta, false);
                }
                else {
                    evaluation = Board.evaluatePosition(Board.applyMoveToBoard(boardState, allPossibleMoves[i]), depth - 1, alpha, beta, false);
                }
                boardState.undoLastMove(false);
                maxEval = Math.max(maxEval, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) {
                    break;
                }
            }
            return maxEval;
        }
        else {
            var minEval = 1000000;
            var evaluation = 0;
            var allPossibleMoves = boardState.getAllPossibleMoves();
            var len = allPossibleMoves.length;
            for (var i = 0; i < len; i++) {
                evaluation = Board.evaluatePosition(Board.applyMoveToBoard(boardState, allPossibleMoves[i]), depth - 1, alpha, beta, true);
                boardState.undoLastMove(false);
                minEval = Math.min(minEval, evaluation);
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) {
                    break;
                }
            }
            return minEval;
        }
    };
    Board.evaluateSingularPosition = function (boardState) {
        var len = boardState.squares.length;
        var len2;
        var contains;
        var tempScore;
        var totalBoardScore = 0;
        if (boardState.whiteHasCastled) {
            totalBoardScore += .6;
        }
        else if (boardState.blackHasCastled) {
            totalBoardScore -= -10;
        }
        var numPieces = 0;
        for (var i = 0; i < len; i++) {
            len2 = boardState.squares[i].length;
            for (var j = 0; j < len2; j++) {
                contains = boardState.contains([i, j]);
                if (contains) {
                    numPieces++;
                    tempScore = 0;
                    if (contains.name == "pawn") {
                        tempScore = 1;
                    }
                    else if (contains.name == "knight" || contains.name == "bishop") {
                        tempScore = 3;
                        if (contains.hasMoved) {
                            tempScore += .5;
                        }
                    }
                    else if (contains.name == "rook") {
                        tempScore = 5;
                    }
                    else if (contains.name == "queen") {
                        tempScore = 9;
                    }
                    else if (contains.name == "king") {
                        if (contains.color) {
                            tempScore = 100;
                        }
                        else {
                            tempScore = 300;
                        }
                        if (!contains.hasMoved) {
                            tempScore += .1;
                        }
                    }
                    if (!contains.color) {
                        tempScore *= -1;
                    }
                    totalBoardScore += tempScore;
                }
            }
        }
        return totalBoardScore;
    };
    Board.applyMoveToBoard = function (boardState, move) {
        // assume legal boardState!!!
        var startSquare = boardState.squares[move.startRank][move.startFile];
        var endSquare = boardState.squares[move.endRank][move.endFile];
        if (startSquare.contains) {
            startSquare.contains.hasMoved = true;
        }
        if (move.castleKingSide) {
            var rookSquare = boardState.getSquare([0, 7]);
            boardState.getSquare([0, 5]).contains = rookSquare.contains;
            rookSquare.contains = null;
            if (boardState.whiteToMove) {
                boardState.whiteHasCastled = true;
            }
            else {
                boardState.blackHasCastled = true;
            }
        }
        endSquare.contains = startSquare.contains;
        startSquare.contains = null;
        boardState.history.push(move);
        boardState.turn++;
        boardState.whiteToMove = !boardState.whiteToMove;
        return boardState;
    };
    Board.prototype.takeAIMove = function () {
        // assume AI is black
        var allPossibleMoves = this.getAllPossibleMoves();
        var len = allPossibleMoves.length;
        var minEval = 1000000;
        var evaluation;
        var currentBestMoves = [];
        var time = new Date().getTime();
        console.log("thinking...");
        for (var i = 0; i < len; i++) {
            evaluation = Board.evaluatePosition(Board.applyMoveToBoard(this, allPossibleMoves[i]), 3, -10000000, 10000000, true);
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
        console.log("Time to calculate: ", new Date().getTime() - time);
        console.log((minEval + 200).toFixed(2));
        this.attemptMove(currentBestMoves[Math.floor(Math.random() * currentBestMoves.length)]);
    };
    Board.prototype.beginGame = function () {
        this.refreshBoard();
        this.addStaticEventListeners();
    };
    return Board;
}());
exports.Board = Board;
