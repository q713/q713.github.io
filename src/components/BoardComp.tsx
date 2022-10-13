import {Component} from "react";
import {Board} from "../domain/Board";
import {TileComp} from "./TileComp";

type BoardProps = {
    board: Board
};

type BoardCompState = {
    board: Board
};

export class BoardComp extends Component<BoardProps, BoardCompState> {

    readonly state: BoardCompState;

    constructor(props: BoardProps) {
        super(props);
        this.state = {
            board: this.props.board
        };
    }

    render() {
        const cells = this.state.board.board.flatMap((row) => {
            return row.flatMap((t) => {
                return <TileComp key={t._yPos.toString() + ',' + t._xPos.toString()} tile={t}/>
            })
        })

        // TODO: dynamic amount of cols
        return <div className='flex justify-start items-center gap-2 grid grid-cols-4 grid-rows-4 aspect-square p-2 bg-stone-700 rounded-lg'>
            {cells}
        </div>
    }
}