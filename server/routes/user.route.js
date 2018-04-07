'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer();
const verifyToken = require('../middleware/verifyToken.js');
const hashPassword = require('../middleware/hashPassword.js');
const isRole = require('../middleware/isRole');


const ROLES = {
  admin: 'admin',
  dev: 'dev',
  user: 'user'
};

var User = require('../schemas/user.js');

router.get('/', verifyToken, isRole.isDev, function(req, res, next) {
  User.getAll(function(err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

router.post('/create', upload.array(), function(req, res, next) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role || ROLES.user
  });

  hashPassword(req.body.password, function(err, hash) {
    if (err) {
      return res.status(500).send('Error hashing password');
    }

    newUser.password = hash;
    newUser.save(function(err) {
      if (err) {
        return next(err);
      } else {
        newUser.validate(function(err) {
          if (err) {
              return next(err);
          }
          res.status(200).send({username: newUser.username, role: newUser.role});
        });
      }
    })
  });
});

router.get('/exist/:username', function(req, res, next) {
  User.findOne({'username': `${req.params.username}`}, function(err, user) {
    if (err) {
      next(err);
    }

    var doesExist = user != undefined;

    res.status(200).send(doesExist);
  });
});

router.put('/role', upload.array(), verifyToken, isRole.isAdmin, function(req, res, next) {
  var query = {username: req.body.username};
  User.findOneAndUpdate(query,
                        {role: req.body.role},
                        {new: true},
                        function(err, updatedUser) {
                          if (err) {
                            return res.status(500).send(new Error('Error updating user'));
                          }
                          res.status(200).send(updatedUser);
                        });
});

router.put('/password', upload.array(), verifyToken, function(userId, req, res, next) {
  var query = {_id: userId};
  User.findById(query, function(err, user) {
    if (err) {
      return res.status(500).send('Error finding user');
    }

    if (!user) {
      return res.status(404).send('No user found');
    }

    user.comparePassword(req.body.oldPassword, function(err, matches) {
      if (err) {
        return res.status(500).send('Error updating password');
      }

      if (!matches) {
        return res.status(400).send('Invalid Password');
      }

      hashPassword(req.body.newPassword, function(err, hash) {
        if (err) {
          return res.status(500).send('Error hashing password');
        }

        user.password = hash;
        user.save(function(user) {
          return res.status(200).send(user);
        });
      });

    });
  });
});

router.delete('/:username', verifyToken, isRole.isAdmin, function(req, res, next) {
  User.deleteOne({username: req.params.username}, function(err) {
    if (err) {
      return res.status(500).send('Could not delete user');
    }

    return res.status(200).send({message: `${req.params.username} successfully deleted`});
  });
});

module.exports = router;
