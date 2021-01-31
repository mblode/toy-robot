import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import Data from '../helpers/Data';
import File from './File';
import Board from './Board';
import Robot from './Robot';
import { Button } from 'baseui/button';

const App = () => {
    const [css] = useStyletron();
    const [file, setFile] = useState('');

    const callback = (content: string) => {
        setFile(content);
    };

    /* if (file !== '') { */
    /*     return ( */
    /*         <div */
    /*             className={css({ */
    /*                 position: 'relative', */
    /*             })}> */
    /*             <Board /> */
    /*             <Robot file={file} /> */
    /*             <Button onClick={() => setFile('')}>Reset</Button> */
    /*         </div> */
    /*     ); */
    /* } */

    return (
        <div
            className={css({
                width: `${Data.width * Data.rows}px`,
                margin: '0 auto',
            })}>
            <File parentCallback={callback} />
            <div
                className={css({
                    position: 'relative',
                    marginTop: '32px',
                })}>
                <Board />
                <Robot file={file} />
            </div>
            <div
                className={css({
                    textAlign: 'center',
                    marginTop: '16px',
                })}>
                <Button onClick={() => setFile('')}>Reset</Button>
            </div>
        </div>
    );
};

export default App;
