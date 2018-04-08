'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();

var Team = require('../schemas/team');
var verifyToken = require('../middleware/verifyToken');
var isRole = require('../middleware/isRole');

function validateTeam(req, res, next) {
  req.checkBody('name', 'Team name is required').exists();
  req.checkBody('overview', 'Team overview is required').exists();
  req.checkBody('goal', 'Team goal is required').exists();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  next();
}

router.get('/', function(req, res, next) {
  Team.getAll(function(err, teams) {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).send(teams);
  });
});

router.post('/create', upload.array(), validateTeam, function(req, res, next) {
  var newTeam = new Team({
    name: req.body.name,
    overview: req.body.overview,
    goal: req.body.goal
  });

  newTeam.save(function(err) {
    if (err) {
      return next(err);
    }

    newTeam.validate(function(err) {
      if (err) {
        return next(err);
      }

      res.status(200).send(newTeam);
    });
  });
});

router.put('/:id', upload.array(), validateTeam, function(req, res, next) {
  var updatedTeam = {
    name: req.body.name,
    overview: req.body.overview,
    goal: req.body.goal
  }

  Team.findOneAndUpdate({_id: req.params.id}, updatedTeam, {new: true}, function(err, updatedTeam) {
    if (err) {
      return status(500).send('Error updating officer');
    }

    res.status(200).send(updatedTeam);
  });
});

router.delete('/:id', function(req, res, next) {
  Team.findOneAndRemove({_id: req.params.id}, function(err, team) {
    if (err) {
      return res.status(500).send('Could not delete team');
    }

    if (!team) {
      return res.status(404).send('Could not find team');
    }

    return res.status(200).send({message: `${team.name} was successfully deleted`});
  });
});

module.exports = router;
