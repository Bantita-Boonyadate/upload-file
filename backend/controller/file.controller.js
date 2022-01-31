const fs = require("fs");

const uploadFile = require("../middleware/upload");

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if(req.file == undefined) {
            return res.status(400).send({ message: "Please upload file" });
        }
        res.status(200).send({
            message: "Uploaded file successfully: " + req.file.originalname,
            // imageUrl: req.file.originalname,
            // fileName: 'http://localhost:8080/files/' + req.file.originalname
            imageUrl: 'http://localhost:8080/files/' + req.file.originalname,
            fileName: req.file.originalname
        });
        // res.status(200).send(req.files);
    } catch (err) {
        if(err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB",
            });
        }
        res.status(500).send({
            message: `Could not upload file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/assets"; // basedir == /User/admin/upload-file/backend

    fs.readdir(directoryPath, function (err, files) {
        if(err) {
            res.status(500).send({
                message: "Unable to scan files",
            });
        }

        let fileInfos = [];
        
         files.forEach((file) => {
             fileInfos.push({
                 name: file,
                 imageUrl: 'http://localhost:8080/files/' + file,
             });
         });

         res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    console.log(fileName);
    const directoryPath = __basedir + "/assets";

    res.download(directoryPath + '/' + fileName , fileName, (err) => {
        if(err) {
            res.status(500).send({
                message: "Could not download file. " + err,
            });
        }
    });
};

module.exports = {upload, getListFiles, download};