import {Board} from './Board';
import {MoveDirection} from "./Constants";

export interface ISolver {
    getNextMove(board: Board): MoveDirection;
}

export class ExpectimaxSolver implements ISolver {

    private _maxSearchDepth: number;
    private _possibleMoveDirections = [MoveDirection.UP, MoveDirection.DOWN, MoveDirection.LEFT, MoveDirection.RIGHT];

    constructor(maxSearchDepth: number) {
        this._maxSearchDepth = maxSearchDepth;
    }

    private fitness(board: Board): number {
        return board.largestPieceValue();
    }

    private maxNode(board: Board, depthLeft: number): number {
        if (depthLeft == 0)
            return this.fitness(board);

        let maxFitness = 0.0;

        for (const dir of this._possibleMoveDirections) {
            let boardCopy = board.copy(true);
            boardCopy.move(dir);
            let curFitness = this.averageNode(boardCopy, depthLeft - 1);
            if (curFitness > maxFitness)
                maxFitness = curFitness;
        }

        return maxFitness
    }

    private averageNode(board: Board, depthLeft: number): number {
        if (depthLeft == 0)
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

        if (!board.isMovePossible())
            throw Error("there is not longer a move possibles");

        let maxFitness = 0.0;
        let bestDirection = MoveDirection.DOWN;
        this._possibleMoveDirections.forEach((dir) => {
            let boardCopy = board.copy(true);
            boardCopy.move(dir);
            let fitness = this.averageNode(boardCopy, this._maxSearchDepth - 1);
            if (maxFitness < fitness) {
                maxFitness = fitness;
                bestDirection = dir;
            }
        });

        return bestDirection
    }
}