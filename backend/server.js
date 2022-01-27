const express = require("express");
const cors = require("cors");
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: `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` });

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