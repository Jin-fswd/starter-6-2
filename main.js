const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const pathForSepia = path.join(__dirname, "sepia");
IOhandler.unzip(zipFilePath,pathUnzipped);

IOhandler.readDir(pathUnzipped)
.then((files) => files.forEach(f => IOhandler.grayScale(f,pathProcessed)))
.then(() => IOhandler.readDir(pathUnzipped))
.then((files1) => files1.forEach(f => IOhandler.doSepia(f,pathForSepia)))
.then(() => console.log("done!"))
.catch((err) => console.log(err))