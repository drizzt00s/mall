//数据库域名 localhost
//数据库 mall
//表 user
//登录用户名 root
//密码 5225541a


//返回标志
//insertInto success "001"
//insertInto failure "001E"

var mysql = require('mysql');

function Db(){   
}
Db.prototype.InsertRegisMobile = function(regType, regMobile, regPass, resolve){
    //regType,regMobile,regPass
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '5225541a',
        database : 'mall'
    }); 
    connection.connect();
    var sql = 'INSERT INTO user (regType,regMobile,regPass) VALUES(?,?,?)';
    var sqlValue = [regType,regMobile,regPass];

    connection.query(sql,sqlValue,function(err, result){
        if(err){
            throw err;
        }
        resolve("001");
        console.log("insert ok");
    });
};

module.exports = Db;


