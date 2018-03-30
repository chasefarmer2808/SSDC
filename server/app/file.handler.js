'use strict';

var multer = require('multer');
var imageFileFilter = require('../middleware/imageFilter');

var handler = {
  imageStorage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'server/assets/images')
    },
    filename: function (req, file, cb) {
      var extention = getFileExtention(file.mimetype);
      cb(null, `${req.body.name}${extention}`)
    }
  }),
  imageFilter: imageFileFilter
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
