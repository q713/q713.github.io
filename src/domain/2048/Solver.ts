import { Board } from './Board';
import { MoveDirection } from "../Constants";

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

    private snake_weights?: Array<Array<number>> = undefined;
    private compute_snake_weights(board_width: number) {
        if (this.snake_weights !== undefined) {
            return;
        }

        let rows = new Array(board_width);
        
        let weight = -board_width;
        for (let r = 0; r < board_width; r++) {
            let col = new Array(board_width);
            for (let c = 0; c < board_width; c++) {
                col[c] = weight;
                weight += board_width / 2;
            }
            rows[r] = col;
        }

        this.snake_weights = rows;
    }

    private fitness(board: Board): number {
        if (!board.isMovePossible())
            return Number.MIN_VALUE;

        this.compute_snake_weights(board.width);

        let fitness = 0;
        for (let row = 0; row < board.width; row++) {
            for (let col = 0; col < board.width; col++) {
                fitness += this.snake_weights![row][col] * board.board[row][col]._value;
            }
        }

        let amount_free = board.getFreePositions().length;
        fitness += amount_free * amount_free * 2;

        return fitness;
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