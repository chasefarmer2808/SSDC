'use strict';

function imageFilter(req, res, next) {
  if (!req.file) {
    return res.status(403).send('No file provided');
  }

  var extentionRegEx = '/\.(jpg|jpeg|png|gif)$/';

  if (!file.originalname.match(extentionRegEx)) {
    return res.status(403).send('File must be an image');
  }

  next();
}

module.exports = imageFilter;
