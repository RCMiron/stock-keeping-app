require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expHbs = require('express-handlebars');

var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var validator = require('express-validator');

var routes = require('./app_server/routes/index');
var userRoutes = require('./app_server/routes/user');
var storeRoutes = require('./app_server/routes/store');

var app = express();

require('./app_server/models/db');
require('./app_server/setup-passport');

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'))
app.engine('.hbs', expHbs({
  defaultLayout:'layout',
  extname: '.hbs',
  layoutsDir: 'app_server/views/layouts',
  partialsDir: 'app_server/views/partials'
}))
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use(cookieParser());
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRoutes);
app.use('/store', storeRoutes);
app.use('/', routes);

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

module.exports = app;
