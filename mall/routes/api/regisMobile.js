var express = require('express');
var router = express.Router();
// var mysql = require('mysql');
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
        db.InsertRegisMobile(user.regType, user.regMobile, user.regPass, resolve);
    });
    promise.then(function(){
        res.send("注册成功");
    });
 
 
    // var connection = mysql.createConnection({
    //     host     : 'localhost',
    //     user     : 'root',
    //     password : '5225541a',
    //     database : 'mall'
    // });  
    // connection.connect();
    // var sql = 'INSERT INTO user (regType,regMobile,regPass) VALUES(?,?,?)';
    // var sqlValue = [user.regType,user.regMobile,user.regPass];

    // connection.query(sql,sqlValue,function(err, result){
    //     if(err){
    //         throw err;
    //     }
    //     console.log(result);
    // });


});

module.exports = router;