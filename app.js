const express = require('express');
const exphbs  = require('express-handlebars');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session'); 

require('./passport/authenticator');

// dir routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var webchatRouter = require('./routes/webchat');

var app = express();

// engine settings
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials',
    extname: '.hbs',
    //helpers: require('./lib/helpers') no usamos helper todavia
}));
app.set('view engine', 'hbs');

// passport settings
app.use(session({
  secret: "clave secreta",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// config app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require("./db");

// routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/webchat', webchatRouter);

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
  res.render('partials/error', {layout: false});
});


module.exports = app;