var express = require('express');
var router = express.Router();
var usersController = require('../app/controllers/usersController');

router.route('/users')
  .post(usersController.createOne);

router.route('/user')
  .get(usersController.getAuthenticatedUser)
  .patch(usersController.update)
  .delete(usersController.delete);

module.exports = router;
