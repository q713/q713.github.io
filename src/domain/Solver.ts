import {Board} from './Board';
import {MoveDirection} from "./Constants";

export interface ISolver {
    getNextMove(board: Board): MoveDirection;
}

export class ExpectimaxSolver implements ISolver{

    getNextMove(board: Board): MoveDirection {
        /* TODO: implement */

        return MoveDirection.DOWN;
    }
}