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

      // try {
      //   octokit.request('POST /repos/{owner}/{repo}/git/blobs', {
      //     owner: 'Bantita-Boonyadate',
      //     repo: 'upload-file',
      //     content: 'content-blob-test'
      //   })
      //     .then((res) => {
      //       console.log(res.data.sha);
      //       const getSHA = res.data.sha;

      //       octokit.request('POST /repos/{owner}/{repo}/git/refs', {
      //         owner: 'Bantita-Boonyadate',
      //         repo: 'upload-file',
      //         ref: "refs/heads/" + fileName,
      //         sha: getSHA,
      //       })
      //         .then((newBranch) => {
      //           console.log(newBranch.data);
      //           const refNameBranch = newBranch.data.ref;
      //           const spiltNameBranch = refNameBranch.split('/');
      //           const nameBranch = spiltNameBranch[2];

      //           // octokit.request('POST /repos/{owner}/{repo}/git/commits', {
      //           //   owner: 'Bantita-Boonyadate',
      //           //   repo: 'upload-file',
      //           //   message: 'message-test-commit',
      //           //   tree: 'tree'
      //           // })
      //           //   .then((CreateCommit) => {
      //           //     console.log(CreateCommit);
      //           //   })

      //           // Create PR
      //           // const newPR = octokit.request('POST /repos/{owner}/{repo}/pulls', {
      //           //   owner: 'Bantita-Boonyadate',
      //           //   repo: 'upload-file',
      //           //   title: 'My Test Pull Request #2',
      //           //   body: 'This pull request is a test #2!',
      //           //   head: nameBranch,
      //           //   base: 'dev'
      //           // })
      //           // console.log(newPR);
      //         })
      //     })

      // } catch (error) {
      //   console.log(error);
      // }

      // Create new branch and PR

      try {
        octokit.request('POST /repos/{owner}/{repo}/git/refs', {
          owner: 'Bantita-Boonyadate',
          repo: 'upload-file',
          ref: "refs/heads/" + fileName,
          sha: "8e6a9bfd89208d93297b1646a3050e6f0ba1c879",
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
