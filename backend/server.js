const express = require("express");
const cors = require("cors");
// const { Octokit } = require("@octokit/core");

// const octokit = new Octokit({ auth: `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` });

// async function createNewBranch () {
//     try {
//         await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
//             owner: 'Bantita-Boonyadate',
//             repo: 'upload-file',
//             ref: "refs/heads/create-branch-2",
//             sha: "3a365f09c8c85b41db96ad2b0c9d5b6a8715c44f",
//         })
//         .then((newBranch) => {
//             const refNameBranch = newBranch.data.ref;
//             const spiltNameBranch = refNameBranch.split('/');
//             const nameBranch = spiltNameBranch[2];
//             console.log(nameBranch);
            
            
//             const newPR = octokit.request('POST /repos/{owner}/{repo}/pulls', {
//                 owner: 'Bantita-Boonyadate',
//                 repo: 'upload-file',
//                 title: 'My Test Pull Request #2',
//                 body: 'This pull request is a test #2!',
//                 head: nameBranch,
//                 base: 'dev'
//             })
//             console.log(newPR);
//         })


//     } catch (error) {
//         console.log(error);
//     }
// }

// createNewBranch();


const app = express();

global.__basedir = __dirname;

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})