import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import FileUpload from './FileUpload';
import { getFiles, showFiles, addFiles } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: `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` });

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


  const uploadFile = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("file", addFilesFromUpload[addFilesFromUpload.length - 1]);

    axios.post('http://localhost:8080/upload', formData
    ).then(res => {
      console.log(res.data);
      const fileName = res.data.fileName;
      console.log(fileName);
      // getAllFiles({ imageUrl: "http://localhost:8080/files/" + res.data.imageUrl })
      getAllFiles(res.data)

      // Create new branch and PR

      try {
        octokit.request('POST /repos/{owner}/{repo}/git/refs', {
          owner: 'Bantita-Boonyadate',
          repo: 'upload-file',
          ref: "refs/heads/" + fileName,
          sha: "3a365f09c8c85b41db96ad2b0c9d5b6a8715c44f",
        })
          .then((newBranch) => {
            const refNameBranch = newBranch.data.ref;
            const spiltNameBranch = refNameBranch.split('/');
            const nameBranch = spiltNameBranch[2];
            
            
            // Create PR
            // const newPR = octokit.request('POST /repos/{owner}/{repo}/pulls', {
            //   owner: 'Bantita-Boonyadate',
            //   repo: 'upload-file',
            //   title: 'My Test Pull Request #2',
            //   body: 'This pull request is a test #2!',
            //   head: nameBranch,
            //   base: 'dev'
            // })
            // console.log(newPR);
          })
    
    
      } catch (error) {
        console.log(error);
      }


    }).catch(err => console.log(err))
  };



  useEffect(() => {
    axios.get('http://localhost:8080/files/')
      .then((res) => {
        // console.log(res);
        for (let i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].imageUrl);
          // showAllFiles(res.data[i]);
          getAllFiles(res.data[i]);
        }
      })
  }, [])


  // console.log(getFilesFromUpload);

  return (
    <>
      <div className="App">
        <FileUpload getFilesFromUpload={getFilesFromUpload} selectFile={selectFile} uploadFile={uploadFile} />
      </div>
    </>

  );
}

export default App;
