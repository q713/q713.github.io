import {Tile} from "./Tile"
import {MoveDirection} from "./Constants";
import {randomMinMax} from "../util/util";

export class Board {
    private readonly _width: number;
    private readonly _chanceTwo: number;
    private readonly _board: Array<Array<Tile>>
    private readonly _directions: Array<MoveDirection>;

    private constructor(width: number, chanceTwo: number, board?: Array<Array<Tile>>) {
        this._width = width;
        this._chanceTwo = chanceTwo;
        this._directions = [MoveDirection.UP, MoveDirection.DOWN, MoveDirection.LEFT, MoveDirection.RIGHT];

        if (board !== undefined) {
            this._board = board;
        } else {
            this._board = new Array(width);
            for (let r = 0; r < this._width; r++) {
                let row = new Array(width);
                for (let c = 0; c < this._width; c++) {
                    row[c] = new Tile(r, c, 0);
                }
                this._board[r] = row;
            }
        }
    }

    public static createBoard(width: number, chanceTwo: number): Board {
        return new Board(width, chanceTwo, undefined);
    }

    get width(): number {
        return this._width;
    }

    get chanceTwo(): number {
        return this._chanceTwo;
    }

    get board(): Array<Array<Tile>> {
        return this._board;
    }

    public getFreePositions(): Array<[number, number]> {
        let freePositions = new Array<[number, number]>();

        this._board.forEach(
            function (row: Array<Tile>) {
                row.forEach(
                    function (tile: Tile) {
                        if (tile._value === 0)
                            freePositions.push([tile._yPos, tile._xPos]);
                    }
                )
            }
        );

        return freePositions;
    }

    public setPositionValue(yPos: number, xPos: number, value: number): void {
        if (yPos < 0 || yPos >= this._width || xPos < 0 || xPos >= this._width)
            throw new Error(`yPos=${yPos}, xPos=${xPos} is not on the board`);

        this._board[yPos][xPos]._value = value;
    }

    public addRandomPiece(): void {
        let freePositions = this.getFreePositions();
        if (freePositions.length === 0)
            throw new Error("cannot init random piece, no free positions left");

        let position = randomMinMax(0, freePositions.length) % freePositions.length;

        let value = randomMinMax(0, 100);
        value = value >= 100 * this._chanceTwo ? 4 : 2;

        this.setPositionValue(freePositions[position][0], freePositions[position][1], value)
    }

    public initRandom(): void {
        this.addRandomPiece();
        this.addRandomPiece();
    }

    private getColOrRows(cols: Boolean): Array<Array<Tile>> {
        let colsOrRows = [];
        for (let a = 0; a < this.width; a++) {
            let colOrRow = [];
            for (let b = 0; b < this.width; b++) {
                if (cols) {
                    colOrRow.push(this._board[b][a]);
                } else {
                    colOrRow.push(this._board[a][b]);
                }
            }
            colsOrRows.push(colOrRow);
        }
        return colsOrRows;
    }

    private getToLeftAndColsOrRowsByDirection(direction: MoveDirection): [boolean, Array<Array<Tile>>] {
        let toLeft = false;
        let colsOrRows: Array<Array<Tile>> | undefined = undefined;
        switch (direction) {
            case MoveDirection.DOWN:
            case MoveDirection.UP: {
                colsOrRows = this.getColOrRows(true);
                toLeft = direction === MoveDirection.UP;
                break;
            }

            case MoveDirection.RIGHT:
            case MoveDirection.LEFT: {
                colsOrRows = this.getColOrRows(false);
                toLeft = direction === MoveDirection.LEFT;
                break;
            }

            default:
                throw new Error(`unable to resolve mode direction ${direction}`);
        }

        return [toLeft, colsOrRows];
    }

    private isMovePossibleInColOrRow(colOrRow: Array<Tile>, toLeft: boolean): boolean {
        let tilesToCheck = toLeft ? colOrRow : colOrRow.reverse();

        for (let index = 0; index < this._width - 1; index++) {
            let tileA = tilesToCheck[index];
            let tileB = tilesToCheck[index+1];

            if (tileA._value === 0 || tileB._value === 0 || tileA._value === tileB._value)
                return true;
        }

        return false;
    }

    public isMovePossibleInDirection(direction: MoveDirection): boolean {
        let leftColsRows = this.getToLeftAndColsOrRowsByDirection(direction);
        let toLeft = leftColsRows[0];
        let colsOrRows = leftColsRows[1];

        let possible = false;
        colsOrRows.forEach((colOrRow) => {
            possible ||= this.isMovePossibleInColOrRow(colOrRow, toLeft);
        });

        return possible;
    }

    public isMovePossible(): boolean {
        let freePositions = this.getFreePositions();
        if (freePositions.length > 0)
            return true

        for (const direction of this._directions) {
            if (this.isMovePossibleInDirection(direction))
                return true;
        }

        /*
        for (let row = 0; row < this._width; row++) {
            for (let col = 0; col < this._width; col++) {
                let tile = this._board[row][col];
                let xPos = tile._xPos;
                let yPos = tile._yPos;

                let positionsToTry = [
                    [1,0],[0,1],[-1,0],[0,-1]
                ]

                for (let yX of positionsToTry) {
                    let newX = xPos - yX[1];
                    let newY = yPos - yX[0];

                    if (newX >= 0 && newY >= 0 && newX < this._width && newY < this._width
                        && this._board[newY][newX]._value === tile._value
                        && (newX !== xPos || newY !== yPos)
                    ) {
                        return true;
                    }
                }
            }
        }
        */

        return false;
    }

    // TODO: fix bug
    private mergeLeft(toMerge: Array<Tile>, toLeft: boolean): [boolean, number] {
        let colOrRow = !toLeft ? toMerge.reverse() : toMerge;

        let performedMove = false;
        let mergePoints = 0;
        let indexToWrite = 0;
        for (let indexToMerge=1; indexToMerge < colOrRow.length; indexToMerge++) {
            let tileToWrite = colOrRow[indexToWrite];
            let tileToMerge = colOrRow[indexToMerge];

            if (tileToWrite._value === tileToMerge._value) {
                tileToWrite._value *= 2;
                mergePoints += tileToWrite._value;
                tileToMerge._value = 0;
                performedMove = true;
            } else {
                if (tileToWrite._value === 0) {
                    tileToWrite._value = tileToMerge._value;
                    tileToMerge._value = 0;
                    performedMove = true;
                } else {
                    if (tileToMerge._value !== 0) {
                        indexToWrite++;
                        tileToWrite = colOrRow[indexToWrite];
                        tileToWrite._value = tileToMerge._value;
                        if (tileToMerge._yPos !== tileToWrite._yPos || tileToMerge._xPos !== tileToWrite._xPos) {
                            tileToMerge._value = 0;
                            performedMove = true;
                        }
                    }
                }
            }
        }

        return [performedMove, mergePoints];
    }

    public move(direction: MoveDirection): [boolean, number] {
        if (!this.isMovePossible())
            throw Error("moves are not possible anymore");

        let leftColsOrRows = this.getToLeftAndColsOrRowsByDirection(direction);
        let toLeft = leftColsOrRows[0];
        let colsOrRows = leftColsOrRows[1];

        let performedMove = false;
        let points = 0;
        colsOrRows.forEach(
            (colOrRow: Array<Tile>) => {
                let performPoints = this.mergeLeft(colOrRow, toLeft);
                performedMove = performedMove || performPoints[0];
                points += performPoints[1];
            }
        );

        return [performedMove, points];
    }


    public copy(deepCopy: Boolean): Board {
        if (!deepCopy)
            return new Board(this.width, this.chanceTwo, this._board);

        let b = new Array(this._width);
        for (let r = 0; r < this._width; r++) {
            let row = new Array(this._width);
            for (let c = 0; c < this._width; c++) {
                let t = this._board[r][c];
                row[c] = new Tile(r, c, t._value);
            }
            b[r] = row;
        }
        return new Board(this.width, this.chanceTwo, b);
    }

    public largestPieceValue(): number {
        let largestValue = -1;
        this._board.forEach(function (row) {
            row.forEach(function (tile) {
                if (tile._value > largestValue)
                    largestValue = tile._value;
            })
        });

        return largestValue;
    }
}


