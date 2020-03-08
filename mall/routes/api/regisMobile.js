var express = require('express');
var router = express.Router();
var User = require("../../modules/user");
var Db = require("../../modules/db");


router.post('/', function(req, res, next) {
    var user = new User();
    user.regType = req.body.regType;
    user.regMobile = req.body.regMobile;
    user.regPass = req.body.regPass;

    var db = new Db();
    var promise = new Promise(function( resolve, reject) {
        console.log("insert start");
        db.InsertRegisMobile(user.regType, user.regMobile, user.regPass, resolve, reject);
    });
    promise.then(function(info){
        var userData = {showName:user.regMobile, resCode:"001"};
        req.session.sessionData = userData;
        //用户信息写入cookie 凭借此信息判断是否登录

        //向前端ajax回调函数返回数据时候加入标志是否注册成功的标志码 001代表注册成功
        res.send(userData);
    }).catch(function(err){
        res(err);
    })
});

module.exports = router;