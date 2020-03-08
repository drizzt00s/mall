var express = require('express');
var router = express.Router();

/* GET mobile registration page */
router.get('/', function(req, res, next) {
  res.render('user');
});

module.exports = router;