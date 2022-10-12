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
        return <div className='grid grid-cols-2 gap-x-0 gap-y-4 justify-evenly '>

            <div className='col-span-2 justify-start'>
                <div className='font-bold text-4xl'>2048</div>

                <div className='text-2xl'>Points: {this.state.points}</div>
            </div>

            <div className='flex col-span-2 justify-center'>
                <BoardComp board={this.state.game.board}/>
            </div>
        </div>
    }
}