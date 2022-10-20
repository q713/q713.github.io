export class SearchGridBoard<SearchGridTile> {

    private readonly _width: number
    private readonly _height: number
    private readonly _board: Array<Array<SearchGridTile>>

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._board = new Array();
    }
}