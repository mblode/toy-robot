import React from 'react';
import Data from '../helpers/Data';
import { useStyletron } from 'baseui';
import { Paragraph1 } from 'baseui/typography';

const Board = () => {
    const [css] = useStyletron();

    return (
        <div>
            {[...Array(Data.rows)].map((_, i) => (
                <div
                    key={i}
                    className={css({
                        display: 'block',
                    })}>
                    {[...Array(Data.columns)].map((_, j) => (
                        <div
                            key={i + j}
                            className={css({
                                background: '#efefef',
                                display: 'inline-flex',
                                width: `${Data.width}px`,
                                height: `${Data.height}px`,
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: '0 0 0 2px white inset',
                            })}>
                            <Paragraph1>
                                {Data.rows - i - 1},{j}
                            </Paragraph1>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
