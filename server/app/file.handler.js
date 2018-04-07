'use strict';

var multer = require('multer');
var fs = require('fs');
var imageFileFilter = require('../middleware/imageFilter');

const IMG_PATH = 'server/assets/images';

var handler = {
  imageStorage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, IMG_PATH)
    },
    filename: function (req, file, cb) {
      var extention = getFileExtention(file.mimetype);
      cb(null, `${req.body.firstName}-${req.body.lastName}${extention}`)
    }
  }),
  imageFilter: imageFileFilter,
  deleteFile: deleteFile
}

module.exports = handler;

function getFileExtention(mimeType) {
  var extention;

  switch (mimeType) {
    case 'image/jpg':
      extention = '.jpg';
      break;

    case 'image/png':
      extended = '.jpg';
      break;

    default:
      extention = '.jpg';
  }

  return extention;
}

function deleteFile(filename, callback) {
  fs.unlink(`${IMG_PATH}/${filename}`, function(err) {
    if (err) {
      return callback(err);
    }

    return callback(null);
  });
}
