import {Board} from "./Board";
import {MoveDirection} from "../Constants";

const WIDTH = 4;
const CHANCE_TWO = 0.9;
const ACCU_START = 4;

function createImpossibleBoard(): Board {
    let board = Board.createBoard(WIDTH, CHANCE_TWO);
    let accu = ACCU_START;
    for (let r = 0; r < WIDTH; r++) {
        for (let c = 0; c < WIDTH; c++) {
            board.setPositionValue(r, c, accu);
            accu *= 2;
        }
    }
    return board;
}

describe("test move possible", () => {
    test('impossible', () => {
            let board = createImpossibleBoard();

            expect(board.isMovePossible()).toBe(false);
        }
    );

    test("empty cell", () => {
        let board = createImpossibleBoard();
        board.setPositionValue(WIDTH - 1, WIDTH - 1, 0);

        expect(board.isMovePossible()).toBe(true);
    });

    test("2 adjacent col equal", () => {
        let board = createImpossibleBoard();
        board.setPositionValue(WIDTH - 1, WIDTH - 2, 2);
        board.setPositionValue(WIDTH - 1, WIDTH - 1, 2);

        expect(board.isMovePossible()).toBe(true);
    });

    test("test initial game board possible", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.initRandom();

        expect(board.isMovePossible()).toBe(true);
    });

    test("move possible in any direction", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(0, 0, 2);
        board.setPositionValue(WIDTH - 1, WIDTH - 1, 2);

        expect(board.isMovePossibleInDirection(MoveDirection.DOWN)).toBe(true);
        expect(board.isMovePossibleInDirection(MoveDirection.UP)).toBe(true);
        expect(board.isMovePossibleInDirection(MoveDirection.LEFT)).toBe(true);
        expect(board.isMovePossibleInDirection(MoveDirection.RIGHT)).toBe(true);
    });

    test("move possible down", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(WIDTH - 1, 0, 8);
        board.setPositionValue(WIDTH - 1, 1, 4);
        board.setPositionValue(WIDTH - 1, 2, 2);
        board.setPositionValue(WIDTH - 1, 3, 4);
        board.setPositionValue(0, 2, 4);

        expect(board.isMovePossibleInDirection(MoveDirection.DOWN)).toBe(true);
    });

    test("possible dir dl", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(0, 0, 8);
        board.setPositionValue(0, 1, 4);
        board.setPositionValue(0, 2, 2);
        board.setPositionValue(1, 0, 4);

        expect(board.isMovePossibleInDirection(MoveDirection.DOWN)).toBe(true);
        expect(board.isMovePossibleInDirection(MoveDirection.RIGHT)).toBe(true);
        expect(board.isMovePossibleInDirection(MoveDirection.LEFT)).toBe(false);
        expect(board.isMovePossibleInDirection(MoveDirection.UP)).toBe(false);
    });

    test("ai board no move possible", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(0, 0, 4);
        board.setPositionValue(0, 1, 8);
        board.setPositionValue(0, 2, 128);
        board.setPositionValue(0, 3, 2);
        board.setPositionValue(1, 0, 2);
        board.setPositionValue(1, 1, 4);
        board.setPositionValue(1, 2, 128);
        board.setPositionValue(1, 3, 4);
        board.setPositionValue(2, 0, 8);
        board.setPositionValue(2, 1, 4);
        board.setPositionValue(2, 2, 16);
        board.setPositionValue(2, 3, 2);
        board.setPositionValue(3, 0, 2);
        board.setPositionValue(3, 1, 4);
        board.setPositionValue(3, 2, 8);
        board.setPositionValue(3, 3, 4);

        expect(board.isMovePossibleInDirection(MoveDirection.DOWN)).toBe(true);
        expect(board.isMovePossibleInDirection(MoveDirection.UP)).toBe(true);
        expect(board.isMovePossibleInDirection(MoveDirection.LEFT)).toBe(false);
        expect(board.isMovePossibleInDirection(MoveDirection.RIGHT)).toBe(false);
        expect(board.isMovePossible()).toBe(true);
    });
});

describe("test merge", () => {
    test("impossible move", () => {
        let board = createImpossibleBoard();

        expect(() => board.move(MoveDirection.UP)).toThrowError();
    });

    test("merge simple down", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(0, 0, 2);
        board.setPositionValue(1, 0, 2);
        board.move(MoveDirection.DOWN);

        expect(board.board[WIDTH - 1][0]._value).toBe(4);
    });

    test("merge simple right", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(0, 0, 2);
        board.setPositionValue(0, 1, 2);
        board.move(MoveDirection.RIGHT);

        expect(board.board[0][WIDTH - 1]._value).toBe(4);
    });

    test("test merge only two in row mergable", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(0, 0, 2);
        board.setPositionValue(0, 1, 2);
        board.setPositionValue(0, 2, 4);
        board.setPositionValue(0, 3, 8);
        board.move(MoveDirection.RIGHT);

        expect(board.board[0][3]._value).toBe(8);
        expect(board.board[0][2]._value).toBe(4);
        expect(board.board[0][1]._value).toBe(4);
        expect(board.board[0][0]._value).toBe(0);
    });

    test("merge row of twos", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(0, 0, 2);
        board.setPositionValue(0, 1, 2);
        board.setPositionValue(0, 2, 2);
        board.setPositionValue(0, 3, 2);
        board.move(MoveDirection.RIGHT);

        expect(board.board[0][3]._value).toBe(4);
        expect(board.board[0][2]._value).toBe(4);
        expect(board.board[0][1]._value).toBe(0);
        expect(board.board[0][0]._value).toBe(0);
    });

    test("test double merge", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(0, 0, 128);
        board.setPositionValue(0, 1, 64);
        board.setPositionValue(0, 2, 64);
        board.setPositionValue(0, 3, 2);
        board.move(MoveDirection.LEFT);

        expect(board.board[0][3]._value).toBe(0);
        expect(board.board[0][2]._value).toBe(2);
        expect(board.board[0][1]._value).toBe(128);
        expect(board.board[0][0]._value).toBe(128);
    });

    test("move down no merge", () => {
        let board = Board.createBoard(WIDTH, CHANCE_TWO);
        board.setPositionValue(WIDTH - 1, 0, 8);
        board.setPositionValue(WIDTH - 1, 1, 4);
        board.setPositionValue(WIDTH - 1, 2, 2);
        board.setPositionValue(WIDTH - 1, 3, 4);
        board.setPositionValue(0, 2, 4);

        board.move(MoveDirection.DOWN);

        expect(board.board[WIDTH - 1][0]._value).toBe(8);
        expect(board.board[WIDTH - 1][1]._value).toBe(4);
        expect(board.board[WIDTH - 1][2]._value).toBe(2);
        expect(board.board[WIDTH - 1][3]._value).toBe(4);
        expect(board.board[WIDTH - 2][2]._value).toBe(4);
        expect(board.board[0][2]._value).toBe(0);
    });
});

export {}