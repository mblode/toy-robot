import React from 'react';
import { Paragraph1 } from 'baseui/typography';

type Props = {
    report: string;
};

const Report = ({ report }: Props) => {
    return (
        <div>
            <Paragraph1>Output: {report}</Paragraph1>
        </div>
    );
};

export default Report;
