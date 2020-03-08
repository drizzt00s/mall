var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next){
    if(req.session.sessionData){
        //已登录
        showName = req.session.sessionData.showName;
        var data = {
          showName:showName
        }
        res.send(data);
      } else{
        //未登录
        res.send(false);
      }
});
module.exports = router;