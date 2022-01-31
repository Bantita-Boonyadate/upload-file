import React from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';

function FileUpload({ getFilesFromUpload, selectFile, uploadFile }) {
    console.log(getFilesFromUpload);
    
    return (
        <>
            <div className='file-upload'>
                <h3>Upload File</h3>
                <input type='file' onChange={selectFile} />
                <button onClick={uploadFile} className='uploadButton'>Upload</button>
                <h3>Display</h3>
                {getFilesFromUpload.map((item) => {
                    // console.log(item);
                    return (
                    <img style={{width: "200px"}} src={item.imageUrl} alt={item.name} />
                    )
                })}
            </div>
        </>
    )
}

export default FileUpload;
