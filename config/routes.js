'use strict';
var express = require('express');
var router = express.Router();
var usersController = require('../app/controllers/usersController');
var pokemonController = require('../app/controllers/pokemonController');
var scripts = require('./scripts');

router.route('/')
  .get(function(req, res, next) {
    res.render('index', {scripts: scripts.publicJs});
  });

router.route('/users')
  .post(usersController.createOne);

router.route('/user')
  .get(usersController.getAuthenticatedUser)
  .patch(usersController.update)
  .delete(usersController.delete);

router.route('/pokemon')
  .get(pokemonController.getAll);

module.exports = router;
