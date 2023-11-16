/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const AdmZip = require("adm-zip");

// const unzipper = require("unzipper"),
//   fs = require("fs"),
//   PNG = require("pngjs").PNG,
//   path = require("path");
//=============================================================
const admZip = require("adm-zip"),
  fs = require("fs"),
  PNG = require("pngjs").PNG;
  path = require("path");

//=============================================================
/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  //console.log(`pathIn : ${pathIn}`);
  //console.log(`pathOut : ${pathOut}`)
   const zip = new AdmZip(pathIn);
   zip.extractAllTo(pathOut)
}


/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    const arr = new Array();
    fs.readdir(dir, (err, files) => {
      if(err) {
        reject(err)
      } else {
        for (const file of files) {
          if(file.includes(".png")) {
            arr.push(file);
          }
        }
        resolve(arr)
      }
    })
  }) 
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  fs.createReadStream(`./unzipped/${pathIn}`)
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        // invert color
        this.data[idx] = 255 - this.data[idx];
        this.data[idx + 1] = 255 - this.data[idx + 1];
        this.data[idx + 2] = 255 - this.data[idx + 2];
      }
    }

    this.pack().pipe(fs.createWriteStream(`${pathOut}/${pathIn}`));
  });
  // console.log(`pathIn(f) : ${pathIn}, pathOut : ${pathOut}`);
  // fs.createReadStream(`./unzipped/${pathIn}`)
  // .pipe(new PNG())
  // .on('parsed', function () {
  //   // 각 픽셀을 grayscale로 변환
  //   for (let y = 0; y < this.height; y++) {
  //     for (let x = 0; x < this.width; x++) {
  //       const idx = (this.width * y + x) << 2;
  //       const avg = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
  //       this.data[idx] = avg;
  //       this.data[idx + 1] = avg;
  //       this.data[idx + 2] = avg;
  //     }
  //   }
  //   this.pack().pipe(fs.createWriteStream(`${pathOut}/${pathIn}`));
  // });
  

};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
