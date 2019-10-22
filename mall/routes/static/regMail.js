var express = require('express');
var router = express.Router();

/* GET mail registration page */
router.get('/', function(req, res, next) {
  res.render('regMail');
});

module.exports = router;
