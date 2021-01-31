import React, { useEffect, useState } from 'react';
import Image from '../img/robot.png';
import Data, { Direction, Command } from '../helpers/Data';
import { useStyletron } from 'baseui';

interface IPos {
    x: number;
    y: number;
    f: Direction;
}

type Props = {
    parentCallback: (content: string) => void;
    file: string;
};

const Robot = ({ parentCallback, file }: Props) => {
    const [css] = useStyletron();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [f, setF] = useState(Direction.NORTH);

    const place = (oldPos: IPos, newPos: IPos): IPos => {
        if (checkLocation(newPos.x, newPos.y)) {
            return newPos;
        }

        return oldPos;
    };

    const move = (pos: IPos): IPos => {
        let diffX = 0;
        let diffY = 0;

        switch (pos.f) {
            case Direction.NORTH: {
                diffY = 1;
                break;
            }
            case Direction.EAST: {
                diffX = 1;
                break;
            }
            case Direction.SOUTH: {
                diffY = -1;
                break;
            }
            case Direction.WEST: {
                diffX = -1;
                break;
            }
        }

        if (checkLocation(pos.x + diffX, pos.y + diffY)) {
            return {
                ...pos,
                x: pos.x + diffX,
                y: pos.y + diffY,
            };
        }

        return pos;
    };

    const left = (pos: IPos): Direction => {
        switch (pos.f) {
            case Direction.NORTH: {
                return Direction.WEST;
            }
            case Direction.EAST: {
                return Direction.NORTH;
            }
            case Direction.SOUTH: {
                return Direction.EAST;
            }
            default: {
                return Direction.SOUTH;
            }
        }
    };

    const right = (pos: IPos): Direction => {
        switch (pos.f) {
            case Direction.NORTH: {
                return Direction.EAST;
            }
            case Direction.EAST: {
                return Direction.SOUTH;
            }
            case Direction.SOUTH: {
                return Direction.WEST;
            }
            default: {
                return Direction.NORTH;
            }
        }
    };

    const report = (pos: IPos) => {
        const output = `${pos.x}, ${pos.y}, ${pos.f.toString()}`;
        parentCallback(output);
    };

    const checkLocation = (newX: number, newY: number) => {
        if (newX < 0 || newY < 0) {
            return false;
        }

        if (newX >= Data.columns || newY >= Data.rows) {
            return false;
        }

        return true;
    };

    const rotation = (): number => {
        switch (f) {
            case Direction.NORTH: {
                return 0;
            }
            case Direction.EAST: {
                return 90;
            }
            case Direction.SOUTH: {
                return 180;
            }
            default: {
                return 270;
            }
        }
    };

    useEffect(() => {
        if (file !== '') {
            let found = false;
            let pos = {
                x: 0,
                y: 0,
                f: Direction.NORTH,
            };
            const lines = file.split('\n');

            for (let i = 0; i < lines.length; i++) {
                const elements = lines[i].split(' ');

                switch (elements[0] as Command) {
                    case Command.PLACE: {
                        const params = elements[1].split(',');
                        let newPos = {
                            x: parseInt(params[0]),
                            y: parseInt(params[1]),
                            f: params[2] as Direction,
                        };

                        pos = place(pos, newPos);

                        found = true;
                        break;
                    }
                    case Command.MOVE: {
                        if (!found) break;
                        pos = move(pos);
                        console.log(pos);
                        break;
                    }
                    case Command.LEFT: {
                        if (!found) break;
                        pos = {
                            ...pos,
                            f: left(pos),
                        };
                        break;
                    }
                    case Command.RIGHT: {
                        if (!found) break;
                        pos = {
                            ...pos,
                            f: right(pos),
                        };
                        break;
                    }
                    case Command.REPORT: {
                        if (!found) break;
                        report(pos);
                        break;
                    }
                }
            }

            setX(pos.x);
            setY(pos.y);
            setF(pos.f);
        }
    }, [file]);

    return (
        <img
            src={Image}
            alt='Robot'
            className={css({
                position: 'absolute',
                bottom: `${Data.width * y}px`,
                left: `${Data.height * x}px`,
                width: `${Data.width}px`,
                height: `${Data.height}px`,
                transform: `rotate(${rotation()}deg)`,
            })}
        />
    );
};

export default Robot;
