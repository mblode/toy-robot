import React, { useEffect, useState } from 'react';
import Image from '../img/robot.png';
import Data, { Direction, Command } from '../helpers/Data';
import { useStyletron } from 'baseui';

type Props = {
    file: string;
};

const Robot = ({ file }: Props) => {
    const [css] = useStyletron();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [f, setF] = useState(Direction.NORTH);

    const place = (newX: number, newY: number, newF: Direction) => {
        const oldX = x;
        const oldY = y;

        setX(newX);
        setY(newY);
        setF(newF);

        if (!checkLocation()) {
            setX(oldX);
            setY(oldY);
        }
    };

    const move = () => {
        const oldX = x;
        const oldY = y;

        switch (f) {
            case Direction.NORTH: {
                setY(1);
                break;
            }
            case Direction.EAST: {
                setX(x + 1);
                break;
            }
            case Direction.SOUTH: {
                setY(y - 1);
                break;
            }
            case Direction.WEST: {
                setX(x - 1);
                break;
            }
        }

        if (!checkLocation()) {
            setX(oldX);
            setY(oldY);
        }
    };

    const left = () => {
        switch (f) {
            case Direction.NORTH: {
                setF(Direction.WEST);
                break;
            }
            case Direction.EAST: {
                setF(Direction.NORTH);
                break;
            }
            case Direction.SOUTH: {
                setF(Direction.EAST);
                break;
            }
            case Direction.WEST: {
                setF(Direction.SOUTH);
                break;
            }
        }
    };

    const right = () => {
        switch (f) {
            case Direction.NORTH: {
                setF(Direction.EAST);
                break;
            }
            case Direction.EAST: {
                setF(Direction.SOUTH);
                break;
            }
            case Direction.SOUTH: {
                setF(Direction.WEST);
                break;
            }
            case Direction.WEST: {
                setF(Direction.NORTH);
                break;
            }
        }
    };

    const report = () => {
        console.log(x, y, f);
    };

    const checkLocation = () => {
        if (x < 0 && y < 0) {
            return false;
        }

        if (x > Data.width && y > Data.height) {
            return false;
        }

        return true;
    };

    useEffect(() => {
        let foundPlace = false;

        if (file !== '') {
            const lines = file.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const elements = lines[i].split(' ');

                console.log(elements[0]);

                switch (elements[0] as Command) {
                    case Command.PLACE: {
                        const params = elements[1].split(',');
                        place(parseInt(params[0]), parseInt(params[1]), params[2] as Direction);
                        foundPlace = true;
                        break;
                    }
                    case Command.MOVE: {
                        if (!foundPlace) break;
                        move();
                        break;
                    }
                    case Command.LEFT: {
                        if (!foundPlace) break;
                        left();
                        break;
                    }
                    case Command.RIGHT: {
                        if (!foundPlace) break;
                        right();
                        break;
                    }
                    case Command.REPORT: {
                        if (!foundPlace) break;
                        report();
                        break;
                    }
                }
            }
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
                transform: `rotate(0deg)`,
            })}
        />
    );
};

export default Robot;
