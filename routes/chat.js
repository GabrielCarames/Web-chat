const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.isAuthenticated, function(req, res, next) {
  const cuenta = req.user
  console.log(cuenta.username)
  res.render('chatIndex', cuenta)
});

module.exports = router;
