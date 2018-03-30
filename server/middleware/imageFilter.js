'use strict';

function imageFilter(req, file, next) {
  if (!file) {
    return next(new Error('No file provided'), false);
  }

  var extentionRegEx = '/\.(jpg|jpeg|png|gif)$/';

  if (!file.originalname.match(extentionRegEx)) {
    return next(new Error('File must be an image'), false);
  }

  next(null, true);
}

module.exports = imageFilter;
