'use strict';

module.exports = function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({err: err});
  } else {
    next(err);
  }
};
