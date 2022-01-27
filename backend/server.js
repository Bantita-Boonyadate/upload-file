const express = require("express");
const cors = require("cors");
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: `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` });

const response = octokit.request('POST /repos/{owner}/{repo}/pulls', {
    owner: 'Bantita-Boonyadate',
    repo: 'upload-file',
    title: 'My Test Pull Request #2',
    body: 'This pull request is a test #2!',
    head: 'test-branch',
    base: 'dev'
})

console.log(`${response} repo found. JUNE!!!!`);

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