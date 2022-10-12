import {Component} from "react";
import {Tile} from "../domain/Tile";

type TileCompProp = {
    tile: Tile
};

export class TileComp extends Component<TileCompProp, {}> {

    render() {
        return <div
            key={this.props.tile._yPos.toString() + ',' + this.props.tile._xPos.toString()}
            className='flex justify-center items-center w-20 h-20 lg:w-24 lg:h-24 text-white
            sm:text-2xl lg:text-6xl font-semibold border-solid border-8 border-gray-300 rounded'>
            {this.props.tile._value}
        </div>;
    }
}