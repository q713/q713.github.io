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
                return <TileComp tile={t}/>
            })
        })

        // TODO: dynamic amount of cols
        return <div className='grid grid-cols-4 border-8 border-gray-700 bg-gray-200 rounded'>
            {cells}
        </div>
    }
}