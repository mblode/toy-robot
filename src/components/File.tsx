import React, { useState, useRef } from 'react';
import { FileUploader } from 'baseui/file-uploader';

type Props = {
    parentCallback: (content: string) => void;
};

const File = ({ parentCallback }: Props) => {
    const [isUploading, setIsUploading] = useState(false);
    const timeoutId = useRef<any>();

    const reset = () => {
        setIsUploading(false);
        clearTimeout(timeoutId.current);
    };

    const handleFile = (e: any) => {
        const content = e.target.result;
        parentCallback(content);
    };

    const handleChangeFile = async (files: any) => {
        setIsUploading(true);
        const file = files[0];
        let fileData = new FileReader();
        fileData.onloadend = handleFile;
        fileData.readAsText(file);
        reset();
    };

    return (
        <div>
            <FileUploader
                onCancel={reset}
                onDrop={(acceptedFiles, _) => {
                    handleChangeFile(acceptedFiles);
                }}
                progressMessage={isUploading ? `Uploading... hang tight.` : ''}
            />
        </div>
    );
};

export default File;
