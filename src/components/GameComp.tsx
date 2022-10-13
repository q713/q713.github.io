import {Component} from "react";
import {Game} from "../domain/Game";
import {BoardComp} from "./BoardComp";
import {KeyBoardEventCodes, MoveDirection} from "../domain/Constants";
import {Board} from "../domain/Board";

type GameCompState = {
    game: Game,
    board: Board,
    points: number
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
            points: g.points
        }
    }

    private updateBoardAndPoints() {
        let p = this.state.game.points;
        let b = this.state.game.board;
        this.setState({
            ...this.state,
            board: b,
            points: p
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
            this.updateBoardAndPoints();
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
                <BoardComp board={this.state.board}/>
            </div>

            {/* TODO: add actions for steering the game */}
        </div>
    }
}