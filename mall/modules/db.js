//数据库域名 localhost
//数据库 mall
//表 user
//登录用户名 root
//密码 5225541a


//返回标志
//default 0
//insertInto success "001"
//insertInto failure "001E"
//select success "002"
//select failure "002E"
//select acct null "002N"
//select pwd mismatch "002Pwd_E"
//select acct and pwd ok "002OK"

var mysql = require('mysql');
function Db(){   
}

Db.prototype.conntect = function(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '5225541a',
        database : 'mall'
    }); 
    return connection;
};

Db.prototype.crypto = function(){
    var crypto = require('crypto');
    return crypto.createHash('md5');
};

Db.prototype.InsertRegisMobile = function(regType, regMobile, regPass, resolve, reject){
    //一个crypto实例只能调用digest一次

    var md5 = new Db().crypto();
    var connection = new Db().conntect();
    connection.connect();
    
    var sql = 'INSERT INTO user (regType,regMobile,regPass) VALUES(?,?,?)';
    regPass = md5.update(regPass).digest('hex');
    var sqlValue = [regType,regMobile,regPass];
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            reject(err);
            throw err;
        }
        resolve("001");
        console.log("insert ok");
    });
};

Db.prototype.InsertRegisMail = function(regType, regMail, regPass, resolve, reject){
    //一个crypto实例只能调用digest一次
    var md5 = new Db().crypto();
    var connection = new Db().conntect();
    connection.connect();
    var sql = 'INSERT INTO user (regType,regMail,regPass) VALUES(?,?,?)';
    regPass = md5.update(regPass).digest('hex');
    var sqlValue = [regType,regMail,regPass];
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            reject(err);
            throw err;
        }
        resolve("001");
        console.log("insert ok");
    });
};

Db.prototype.LoginCheck = function(column, acct, pwd, resolve, reject){
    //一个crypto实例只能调用digest一次
    var md5 = new Db().crypto();
    var connection = new Db().conntect();
    connection.connect();
    var sql = "SELECT * From user WHERE " + column +"=?";
    var sqlValue = [acct];
    connection.query(sql,sqlValue,function(err, result){
        if(err){
            reject(err);
            throw err;
        }
        if(result.length === 0){
            //没有此用户名
            resolve("002N");
            console.log("select ok! acct not exist");
        } else{
            //用户名存在 检查密码
           // console.log(JSON.stringify(result));
           pwd = regPass = md5.update(pwd).digest('hex');
           if(result[0]["regPass"] === pwd){
                //密码匹配 登录成功 设置session
            var data = {
                resCode:"002OK",
                acct:acct
            }
            resolve(data);
            console.log("select ok! login!");
           } else{
               //密码错误 登录失败 不设置session
            resolve("002Pwd_E");
            console.log("select ok! but pwd incorrect");
           }
        }
    });
}

module.exports = Db;


