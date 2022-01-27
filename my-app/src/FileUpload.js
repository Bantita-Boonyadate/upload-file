import React from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';

function FileUpload({ getFilesFromUpload, selectFile, uploadFile }) {
    // const [file, setFile] = useState('');
    // const [data, setData] = useState([]);

    // const handleChange = (event) => {
    //     setFile(event.target.files[0]);
    // };

    // const uploadFile = (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append("file", file);

    //     axios.post('http://localhost:8080/upload', formData
    //        ).then(res => {
    //         console.log(res);
    //         setData({imageUrl: "http://localhost:8080/files/" + res.data.imageUrl })
    //        }).catch(err => console.log(err))
    // };

    // console.log(data);

    // อันนี้แบบ redux

    // const dispatch = useDispatch();

    // const addFiles = (file) => {
    //     file.map((item) => {
    //         dispatch(addFiles(item))
    //     })
    // }

    // const selectFile = (event) => {
    //     dispatch(addFiles(event.target.files[0]));
    // };

    // const uploadFile = (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append("file", getFiles);

    //     axios.post('http://localhost:8080/upload', formData
    //     ).then(res => {
    //         console.log(res);
    //         dispatch(getFiles({ imageUrl: "http://localhost:8080/files/" + res.data.imageUrl }))
    //     }).catch(err => console.log(err))
    // };

    // console.log(getFiles);

    console.log(getFilesFromUpload);


    return (
        <>
            <div className='file-upload'>
                <h3>Upload File</h3>
                <input type='file' onChange={selectFile} />
                <button onClick={uploadFile} className='uploadButton'>Upload</button>
                <h3>Display</h3>
                {getFilesFromUpload.map((item) => {
                    console.log(item);
                    return (
                    <img style={{width: "200px"}} src={item.imageUrl} alt={item.name} />
                    )
                })}
            </div>
        </>
    )
}

export default FileUpload;
