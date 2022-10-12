import {Component} from "react";
import {Game} from "../domain/Game";
import {BoardComp} from "./BoardComp";

type GameCompState = {
    game: Game,
    points: number
};

export class GameComp extends Component<{}, GameCompState> {

    readonly state: GameCompState

    constructor(props: any) {
        super(props);
        let g = Game.createHumanGame();
        g.initGame();
        this.state = {
            game: g,
            points: g.points
        }
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

            {/* TODO: add actions for steering the game */}
        </div>
    }
}