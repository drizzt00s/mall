var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');
var logger = require('morgan');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use(session({
  name:"sessionId",
  secret:"la10018__12Aty"
  // cookie:{maxAge: 60000}
}));








// static page 
var indexRouter = require('./routes/static/index');
var regMobileRouter = require('./routes/static/regMobile');
var regMailRouter = require('./routes/static/regMail');
var loginRouter = require('./routes/static/login');
var userRouter = require('./routes/static/user');

var manDressRouter = require('./routes/static/manDress');



// static page router
app.use('/', indexRouter);//首页
app.use('/regMobile', regMobileRouter);//手机注册页面
app.use('/regMail', regMailRouter);//邮箱注册页面
app.use('/login', loginRouter);//登录页面
app.use('/user', userRouter);//用户中心首页
app.use('/manDress', manDressRouter);//男装landing页面



//api
var regisMobileRouter = require('./routes/api/regisMobile');//手机注册
var regisMailRouter = require('./routes/api/regisMail');//邮箱注册
var checkIsLoginRouter = require('./routes/api/checkIsLogin');//检查是否登录
var loginRouter = require('./routes/api/login');//检查是否登录
//api router
app.use("/regisMobile", regisMobileRouter);
app.use("/regisMail", regisMailRouter);
app.use("/checkIsLogin", checkIsLoginRouter);
app.use("/login", loginRouter);
















// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
