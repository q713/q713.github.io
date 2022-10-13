import {Component} from "react";
import {Tile} from "../domain/Tile";

type TileCompProp = {
    tile: Tile
};

function getTileColor(value: number): string {
    switch (value) {
        case 0:
            return "bg-gray-600";
        case 2:
            return "bg-amber-400";
        default:
            return "bg-stone-900";
    }
}

export class TileComp extends Component<TileCompProp, {}> {

    render() {
        return <div
            className={`flex justify-center text-2xl w-24 h-24 items-center font-bold text-gray-50 border-solid rounded-lg 
                ${getTileColor(this.props.tile._value)} rounded-lg`}>
            {this.props.tile._value}
        </div>;
    }
}