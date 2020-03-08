var express = require('express');
var router = express.Router();
var User = require("../../modules/user");
var Db = require("../../modules/db");

router.post("/", function(req,res,next){
    var user = new User();
    user.regType = req.body.regType;
    user.regMail = req.body.regMail;
    user.regPass = req.body.regPass;

    var db = new Db();
    var promise = new Promise(function( resolve, reject) {
        console.log("insert start");
        db.InsertRegisMail(user.regType, user.regMail, user.regPass, resolve);
    });
    promise.then(function(){
        res.send("注册成功");
    });

});

module.exports = router;