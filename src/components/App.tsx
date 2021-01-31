import React, { useState } from 'react';
import { useStyletron } from 'baseui';
import { H1 } from 'baseui/typography';
import Data from '../helpers/Data';
import File from './File';
import Board from './Board';
import Robot from './Robot';
import Report from './Report';

const App = () => {
    const [css] = useStyletron();
    const [file, setFile] = useState('');
    const [report, setReport] = useState('');

    const fileCallback = (content: string) => {
        setFile(content);
    };

    const reportCallback = (value: string) => {
        setReport(value);
    };

    return (
        <div
            className={css({
                width: `${Data.width * Data.rows}px`,
                margin: '16px auto',
            })}>
            <H1 className={css({ textAlign: 'center' })}>Toy Robot Simulator</H1>
            <File parentCallback={fileCallback} />
            <div
                className={css({
                    position: 'relative',
                    marginTop: '16px',
                })}>
                <Board />
                <Robot parentCallback={reportCallback} file={file} />
            </div>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: '16px',
                })}>
                {report !== '' && <Report report={report} />}
            </div>
        </div>
    );
};

export default App;
