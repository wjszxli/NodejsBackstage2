var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config-lite');
var session=require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var report =require('./routes/report');
var reportRouter=require('./routes/reportRoutes');
var catalogue=require('./routes/catalogue');
var organize = require('./routes/organize');
var role = require('./routes/role');
var reportShows= require('./routes/reportShows');

const fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/reportRoutes',reportRouter);
app.use('/catalogue',catalogue);
app.use('/organize',organize);
app.use('/role',role);
app.use('/reportShows',reportShows);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var coors = {};
coors.left_top = {};
coors.right_top = {};
coors.left_bottom = {};
coors.right_bottom = {};
//填充coors中内容
var filename = "d:\\coors\\0.json";
fs.writeFileSync(filename, JSON.stringify(coors));
module.exports = app;
