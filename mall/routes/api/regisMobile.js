var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var User = require("../../modules/user");

router.post('/', function(req, res, next) {

    var user = new User();

    user.regType = req.body.regType;
    user.regMobile = req.body.regMobile;
    user.regPass = req.body.regPass;
    
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '5225541a',
        database : 'mall'
    });  
    connection.connect();
    var sql = 'INSERT INTO user (regType,regMobile,regPass) VALUES(?,?,?)';
    var sqlValue = [user.regType,user.regMobile,user.regPass];

    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        console.log(result);
    });




});

module.exports = router;