function Utlity(){

};

Utlity.prototype.isMobile = function(acct){
    var isMobile = true;
    var filter = /^1[3456789]\d{9}$/;
    if(!(filter.test(acct))){
        isMobile = false;
    }
    return isMobile;
};

Utlity.prototype.isMail = function(acct){
    var isMail = true;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!(filter.test(acct))){
        isMail = false;
    }
    return isMail;
};

module.exports = Utlity;