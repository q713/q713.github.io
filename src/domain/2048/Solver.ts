import {Board} from './Board';
import {MoveDirection} from "../Constants";
import {Tile} from './Tile';

export interface ISolver {
    getNextMove(board: Board): MoveDirection;
}

export class ExpectimaxSolver implements ISolver {

    private readonly _maxSearchDepth: number;
    private readonly _possibleMoveDirections;

    constructor(maxSearchDepth: number) {
        this._maxSearchDepth = maxSearchDepth;
        this._possibleMoveDirections = [MoveDirection.UP, MoveDirection.DOWN, MoveDirection.LEFT, MoveDirection.RIGHT];
    }

    private fitness(board: Board): number {
        if (!board.isMovePossible())
            return Number.MIN_VALUE; 

        // is the largest piece within a corner
        let largestPiece = board.largestPiece();
        let largestPieceInCorner = false;
        let largestPieceOnBorder = false;
        let goodLargestPiecePosiitons = [[0, 0], [0, board.width - 1], [board.width - 1, 0], [board.width - 1, board.width - 1]];
        goodLargestPiecePosiitons.forEach((largestPos) => {
            if (largestPos[0] === largestPiece._yPos && largestPos[1] === largestPiece._yPos) {
                largestPieceInCorner = true;
            }
        })
        if (largestPieceInCorner || largestPiece._xPos === 0 || largestPiece._yPos === 0 
            || largestPiece._xPos === board.width-1 || largestPiece._yPos === board.width-1) 
            largestPieceOnBorder = true;

        // calculate monotonicity on the board
        let scoreRowOrCol = function (colOrRow: Array<Tile>): [number, number] {
            let incrementScore = 0;
            let decrementScore = 0;
            for (let index = 0; index < colOrRow.length; index++) {
                let tileA = colOrRow[index];
                incrementScore += tileA._value;
                if (index === 0) {
                    decrementScore += tileA._value;
                    continue;
                }
                let tileB = colOrRow[index-1];
                if (tileA._value <= tileB._value) {
                    decrementScore += tileA._value;
                    if (tileA._value < tileB._value) {
                        incrementScore -= tileA._value;
                    }
                }
            }
            return [incrementScore, decrementScore];
        }
        let distance = 0.0;
        let cols = board.getColOrRows(true);
        cols.forEach(col => {
            let [incrementScore, decrementScore] = scoreRowOrCol(col);
            distance += Math.max(incrementScore, decrementScore);
        });
        let rows = board.getColOrRows(false);
        rows.forEach(row => {
            let [incrementScore, decrementScore] = scoreRowOrCol(row);
            distance += Math.max(incrementScore, decrementScore);
        });

        // accumulate the tile values
        let gameTileAkku = 0.0;
        board.board.forEach(row => row.forEach(tile => {gameTileAkku += tile._value;}));

        let score = 0.0;
        let freeTileWeight = largestPiece._value >= 1024 ? Math.log2(largestPiece._value) : 17;
        score += freeTileWeight * board.getFreePositions().length;
        if (largestPieceInCorner) {
            score += 3*distance;
        } else if (largestPieceOnBorder) {
            score += 2*distance;
        } else {
            score += distance;
        }/*
        score += largestPiece._value;
        score += gameTileAkku;
        */
        //score += distance;
        return score;
    }

    private getPossibleDirections(board: Board): Array<MoveDirection> {
        let possibleDirections: Array<MoveDirection> = [];
        for (const dir of this._possibleMoveDirections) {
            if (board.isMovePossibleInDirection(dir))
                possibleDirections.push(dir);
        }
        return possibleDirections;
    }

    private maxNode(board: Board, depthLeft: number): number {
        if (depthLeft === 0)
            return this.fitness(board);

        let maxFitness = 0.0;
        let posDir = this.getPossibleDirections(board);
        for (const dir of posDir) {
            let boardCopy = board.copy(true);
            boardCopy.move(dir);
            let curFitness = this.averageNode(boardCopy, depthLeft - 1);
            if (curFitness > maxFitness)
                maxFitness = curFitness;
        }

        return maxFitness
    }

    private averageNode(board: Board, depthLeft: number): number {
        if (depthLeft === 0)
            return this.fitness(board);

        let freePositions = board.getFreePositions();
        if (freePositions.length === 0)
            return this.fitness(board);

        let averageFitness = 0.0;
        freePositions.forEach((pos) => {
            let boardCopy = board.copy(true);
            boardCopy.setPositionValue(pos[0], pos[1], 2);
            let curFitness = this.maxNode(boardCopy, depthLeft - 1);
            averageFitness += curFitness * board.chanceTwo / freePositions.length;

            boardCopy = board.copy(true);
            boardCopy.setPositionValue(pos[0], pos[1], 4);
            curFitness = this.maxNode(boardCopy, depthLeft - 1);
            averageFitness += curFitness * (1.0 - board.chanceTwo) / freePositions.length;
        });

        return averageFitness
    }

    public getNextMove(board: Board): MoveDirection {
        if (this._maxSearchDepth <= 0)
            throw Error("search depth must be at least 1");

        let possibleDirections = this.getPossibleDirections(board);
        if (possibleDirections.length === 1)
            return possibleDirections[0];

        if (possibleDirections.length < 1)
            throw Error("there is not longer a move possibles");

        let maxFitness = 0.0;
        let bestDirection = possibleDirections[0];
        for (const dir of possibleDirections) {
            let boardCopy = board.copy(true);
            boardCopy.move(dir);
            let fitness = this.averageNode(boardCopy, this._maxSearchDepth - 1);
            if (maxFitness < fitness) {
                maxFitness = fitness;
                bestDirection = dir;
            }
        }

        return bestDirection;
    }
}