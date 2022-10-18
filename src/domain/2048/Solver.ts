import {Board} from './Board';
import {MoveDirection} from "../Constants";

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
        let largestPieceInCorner = false;
        let largestPiece = board.largestPiece();
        let goodLargestPiecePosiitons = [[0, 0], [0, board.width - 1], [board.width - 1, 0], [board.width - 1, board.width - 1]];
        goodLargestPiecePosiitons.forEach((largestPos) => {
            if (largestPos[0] === largestPiece._yPos && largestPos[1] === largestPiece._yPos) {
                largestPieceInCorner = true;
            }
        })

        let akkuTileValues = 0;
        let distance = 0.0;
        let soroundingTiles = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
        board.board.forEach((row) => {
            row.forEach(tile => {
                akkuTileValues += tile._value;
                let tXpos = tile._xPos;
                let tYpos = tile._yPos;
                soroundingTiles.forEach(stp => {
                    let sXpos = tXpos + stp[0];
                    let sYpos = tYpos + stp[1];
                    if (sXpos >= 0 && sXpos < board.width && sYpos >= 0 && sYpos < board.width) {
                        let souroundingTile = board.board[sYpos][sXpos];
                        distance += Math.abs(tile._value - souroundingTile._value);
                    }
                });
            });
        });

        let score = board.largestPieceValue() + akkuTileValues + distance + board.getFreePositions().length * 10;
        if (largestPieceInCorner) {
            score += akkuTileValues;
        }

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