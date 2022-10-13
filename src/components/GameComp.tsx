import {Component, Fragment} from "react";
import {Game} from "../domain/Game";
import {BoardComp} from "./BoardComp";
import {KeyBoardEventCodes, MoveDirection} from "../domain/Constants";
import {Board} from "../domain/Board";
import {Transition, Dialog} from "@headlessui/react";

type GameCompState = {
    game: Game,
    board: Board,
    points: number
    showGameOver: boolean,
};

export class GameComp extends Component<{}, GameCompState> {

    //readonly state: GameCompState;
    constructor(props: any) {
        super(props);
        let g = Game.createHumanGame();
        g.initGame();
        this.state = {
            game: g,
            board: g.board,
            points: g.points,
            showGameOver: false
        }
    }

    private closeGameOver() {
        this.setState({
            ...this.state,
            showGameOver: false
        });
    }

    private startNewGame() {
        let g = Game.createHumanGame();
        g.initGame();
        this.updateState(g);
    }

    private updateState(g: Game) {
        let p = g.points;
        let b = g.board;
        console.log(b);
        let isGameOver = g.isGameOver();
        this.setState({
            ...this.state,
            game: g,
            board: b,
            points: p,
            showGameOver: isGameOver
        });
    }

    private handleKeyPress(event: KeyboardEvent) {
        let direction: MoveDirection | undefined = undefined;
        switch (event.code) {
            case KeyBoardEventCodes.KEY_ARROW_DOWN:
            case KeyBoardEventCodes.KEY_S:
                direction = MoveDirection.DOWN;
                break;
            case KeyBoardEventCodes.KEY_ARROW_UP:
            case KeyBoardEventCodes.KEY_W:
                direction = MoveDirection.UP;
                break;
            case KeyBoardEventCodes.KEY_ARROW_RIGHT:
            case KeyBoardEventCodes.KEY_D:
                direction = MoveDirection.RIGHT;
                break;
            case KeyBoardEventCodes.KEY_ARROW_LEFT:
            case KeyBoardEventCodes.KEY_A:
                direction = MoveDirection.LEFT;
                break;
            default:
                return;
        }

        let performable = this.state.game.performMove(direction!);
        if (performable) {
            this.updateState(this.state.game);
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyPress.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyPress.bind(this));
    }

    render() {
        return <div className="max-w-lg mx-auto px-8 flex flex-col min-h-screen">
            <div className="flex py-8">
                <div className="px-2 py-2 font-bold text-4xl rounded-lg">
                    2048
                </div>
            </div>

            <div className="flex mb-4">
                <div
                    className="ml-auto mr-4 relative px-3 py-1 rounded-lg text-center">
                    <div className="text-xs font-bold uppercase">Points</div>
                    <div className="font-bold">{this.state.points}</div>
                </div>
            </div>

            <div className="p-4 rounded-lg mb-4 text-xl relative overflow-hidden ">
                <BoardComp board={this.state.game.board}/>
            </div>

            <div className="flex mb-4">
                <button className="text-xs font-bold uppercase rounded-lg bg-stone-800 text-white ml-auto
                    px-5 py-2.5 mr-4" onClick={this.startNewGame.bind(this)}>
                    Restart
                </button>
            </div>

            <Transition appear show={this.state.showGameOver} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={this.closeGameOver.bind(this)}>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left
                                    align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    You won!
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        You reached a 2048 tile with a score of {this.state.points}!
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button type="button" className="inline-flex justify-center rounded-md border
                                            border-transparent bg-stone-800 px-4 py-2 text-sm font-medium
                                            hover:bg-stone-800 focus:outline-none focus-visible:ring-2
                                            focus-visible:ring-stone-800 focus-visible:ring-offset-2 text-white"
                                            onClick={this.closeGameOver.bind(this)}>
                                        Back to the game!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    }
}