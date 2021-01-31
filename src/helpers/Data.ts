export enum Direction {
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
    EAST = 'EAST',
    WEST = 'WEST',
}

export enum Command {
    PLACE = 'PLACE',
    MOVE = 'MOVE',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    REPORT = 'REPORT',
}

const Data = {
    columns: 5,
    rows: 5,
    width: 100,
    height: 100,
};

export default Data;
