import {Component} from "react";
import {Board} from "../domain/Board";
import {TileComp} from "./TileComp";

type BoardProps = {
    board: Board
};


export class BoardComp extends Component<BoardProps, {}> {

    constructor(props: BoardProps) {
        super(props);
    }

    render() {
        const cells = this.props.board.board.flatMap((row) => {
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