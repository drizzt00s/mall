var express = require('express');
var router = express.Router();
var User = require("../../modules/user");
var Db = require("../../modules/db");

router.post("/", function(req,res,next){
    var user = new User();
    user.regType = req.body.regType;
    user.regMail = req.body.regMail;
    user.regPass = req.body.regPass;
    console.log("!");
    console.log(user.regType);
    console.log(user.regMail);
    console.log(user.regPass);

});

module.exports = router;