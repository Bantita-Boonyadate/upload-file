import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import FileUpload from './FileUpload';
import { getFiles, showFiles, addFiles } from './slice';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const getFilesFromUpload = useSelector(state => state.files.getFiles);
  // const showFilesFromAssets = useSelector(state => state.files.showFiles);
  const addFilesFromUpload = useSelector(state => state.files.addFiles);

  const selectFile = (event) => {
    dispatch(addFiles(event.target.files[0]));
  };

  const getAllFiles = (item) => {
    dispatch(getFiles(item))
  }

  // const showAllFiles = (item) => {
  //   dispatch(showFiles(item))
  // }

  const uploadFile = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("file", addFilesFromUpload[addFilesFromUpload.length-1]);

    axios.post('http://localhost:8080/upload', formData
    ).then(res => {
      console.log(res.data);
      // getAllFiles({ imageUrl: "http://localhost:8080/files/" + res.data.imageUrl })
      getAllFiles(res.data)
    }).catch(err => console.log(err))
  };



  useEffect(() => {
    axios.get('http://localhost:8080/files/')
    .then((res) => {
      console.log(res);
      for(let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].imageUrl);
        // showAllFiles(res.data[i]);
        getAllFiles(res.data[i]);
      }
    })
  }, [])


  console.log(getFilesFromUpload);

  return (
    <>
      <div className="App">
        <FileUpload getFilesFromUpload={getFilesFromUpload} selectFile={selectFile} uploadFile={uploadFile} />
      </div>
    </>

  );
}

export default App;
