import {Board} from "./Board";

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
        board.setPositionValue(WIDTH-1, WIDTH-1, 0);

        expect(board.isMovePossible()).toBe(true);
    });

    test("2 adjacent col equal", () => {
        let board = createImpossibleBoard();
        board.setPositionValue(WIDTH-1, WIDTH-2, 2);
        board.setPositionValue(WIDTH-1, WIDTH-1, 2);

        expect(board.isMovePossible()).toBe(true);
    });
});

describe("test merge", () => {

});

export {}