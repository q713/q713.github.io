export class Tile{

    readonly _yPos: number;
    readonly _xPos: number;
    _value: number;

    constructor(yPos: number, xPos: number, value:number) {
        this._yPos = yPos;
        this._xPos = xPos;
        this._value = value;
    }
}

