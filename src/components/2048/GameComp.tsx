import {Component} from "react";
import {Game} from "../../domain/Game";
import {BoardComp} from "./BoardComp";
import {GameState, KeyBoardEventCodes, MoveDirection} from "../../domain/Constants";
import {Board} from "../../domain/Board";
import {GameEnded} from "./GameEnded";

type GameProps = {
    humanPlayer: boolean
};

type GameCompState = {
    game: Game,
    board: Board,
    points: number,
    gameState: GameState
};

export class GameComp extends Component<GameProps, GameCompState> {

    //readonly state: GameCompState;
    constructor(props: GameProps) {
        super(props);
        let g = props.humanPlayer ? Game.createHumanGame() : Game.createAiGame();
        g.initGame();
        this.state = {
            game: g,
            board: g.board,
            points: g.points,
            gameState: GameState.GAME_READY
        }
    }

    private closeGameOver() {
        this.setState({
            ...this.state,
            gameState: GameState.GAME_STOPPED
        })
    }

    private closeGameWon() {
        this.setState({
            ...this.state,
            gameState: GameState.GAME_RUNNING
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
        let isGameOver = g.isGameOver();
        let isGameWon = g.isGameWon();

        let state: GameState | undefined = undefined;
        if (isGameOver) {
            state = GameState.GAME_OVER;
        } else if (isGameWon) {
            state = GameState.GAME_WON;
        } else {
            state = GameState.GAME_RUNNING;
        }

        console.log(state);

        this.setState({
            game: g,
            board: b,
            points: p,
            gameState: state
        });
    }

    private handleKeyPress(event: KeyboardEvent) {
        event.preventDefault();

        if (this.state.gameState === GameState.GAME_STOPPED || this.state.gameState === GameState.GAME_OVER)
            return;

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
        if (this.state.gameState === GameState.GAME_READY && this.state.game.humanPlayer) {
            window.addEventListener("keydown", this.handleKeyPress.bind(this));
        }
    }

    componentWillUnmount() {
        if (this.state.game.humanPlayer) {
            window.removeEventListener("keydown", this.handleKeyPress.bind(this));
        }
    }

    render() {
        if ((this.state.gameState === GameState.GAME_READY || this.state.gameState === GameState.GAME_RUNNING)
            && !this.state.game.humanPlayer) {
            //this.state.game.performAiMove().then(performable => {
            //    if (performable)
            //        this.updateState(this.state.game);
            //});
        }

        return <div className="max-w-lg mx-auto mt-20 px-8 flex flex-col min-h-screen">
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

            <GameEnded gameState={this.state.gameState} points={this.state.points} closeModal={
                this.state.gameState === GameState.GAME_OVER ? this.closeGameOver.bind(this)
                    : this.closeGameWon.bind(this)}/>
        </div>
    }
}