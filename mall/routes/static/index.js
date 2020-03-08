var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.sessionData){
    console.log(req.session.sessionData);
    console.log("已登录");
  } else{
    console.log(req.session.sessionData);
    console.log("未登录");
  }
  res.render('index');
});

module.exports = router;
