import {Component} from "react";
import {Tile} from "../../domain/Tile";

type TileCompProp = {
    tile: Tile
};

function getTileColor(value: number): string {
    switch (value) {
        case 0:
            return "bg-gray-600";
        case 2:
            return "bg-amber-400";
        case 4:
            return "bg-orange-400";
        case 8:
            return "bg-orange-600";
        case 16:
            return "bg-red-500";
        case 32:
            return "bg-red-600";
        case 64:
            return "bg-red-700";
        case 128:
            return "bg-green-400";
        case 256:
            return "bg-green-500";
        case 512:
            return "bg-green-600";
        case 1024:
            return "bg-blue-400";
        case 2048:
            return "bg-red-500";
        case 4096:
            return "bg-blue-600";
        case 8192:
            return "bg-blue-700";
        case 16384:
            return "bg-violet-600";
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