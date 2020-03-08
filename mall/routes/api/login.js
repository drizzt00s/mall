var express = require('express');
var router = express.Router();

var User = require("../../modules/user");
var Db = require("../../modules/db");
var Utlity = require("../../modules/Utlity");

router.post("/", function(req, res, next){
    var acct = req.body.acct;
    var pwd = req.body.pwd;
    //判断账号是邮箱还是手机
    var utlity = new Utlity();
    var acctType = utlity.isMobile(acct) ? "mobile" : "mail";
    var regType = acctType == "mobile" ? "regMobile" : "regMail";
    //根据传来的邮箱或者账号查询数据库中regMail还是regMobile字段
 
    var db = new Db();
    var promise = new Promise(function( resolve, reject) {
        console.log("select start");
        db.LoginCheck(regType, acct, pwd, resolve, reject);
    });
    promise.then(function(dbInfo){
        if(dbInfo === "002N"){
            //select查询成功 没有此用户名 不设置session
            var data = {
                "resCode":dbInfo
            }
            res.send(data);
        } else if(dbInfo === "002Pwd_E"){
            //select查询成功 用户名存在 但密码不正确 不设置session
            var data = {
                "resCode":dbInfo
            }
            res.send(data);
        } else if(dbInfo.resCode === "002OK"){
            //select查询成功 用户名 账号匹配 设置session
            var userData = {showName:dbInfo.acct, resCode:"002OK"};
            req.session.sessionData = userData;
            res.send(userData);
        }
    }).catch(function(err){

    });

});

module.exports = router;