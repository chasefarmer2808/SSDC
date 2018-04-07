'use strict';

const deleteFile = require('../app/file.handler').deleteFile;
const Officer = require('../schemas/officer');

function deleteFileByRouteParams(req, res, next) {
  Officer.getFilename(req.params.oldFirstName, req.params.oldLastName,
    function(err, filename) {
      if (err) {
        return res.status(err.status).send(err.message);
      }

      deleteFile(filename, function(err) {
        if (err) {
          return res.status(500).send('Error removing file');
        }

        next();
      });
  });
}

module.exports = deleteFileByRouteParams;
