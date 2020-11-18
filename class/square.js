export class Square {
    constructor(rank, file, contains) {
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
    getInnerHTML() {
        if (this.contains == null) {
            if (this.currLegalMove) {
                return '<img class="piece" src="./images/legal_move.png"/>';
            }
            return "";
        }
        return this.contains.getInnerHTML(this.currLegalMove);
    }
}
