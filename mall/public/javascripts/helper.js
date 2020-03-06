
var helper = {};
helper.errorCheck = function(){
    var isClear = true;
    var errorLength = $(".ver-errors").length;
    if(errorLength !== 0){
        isClear = false;
    }
    return isClear;
};


 


