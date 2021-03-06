const express = require('express');
const exphbs  = require('express-handlebars');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session'); 
const flash = require('connect-flash');

require('./passport/authenticator');

// dir routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var chatRouter = require('./routes/chat');
var chatindexRouter = require('./routes/chatindex');

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
app.use(flash());

// config app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require("./db");

// error handler
app.use((req, res, next) => {
  res.locals.messageSuccess = req.flash('messageSuccess');
  res.locals.messageFailure = req.flash('messageFailure');
  next();
});

// routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);
app.use('/chatindex', chatindexRouter);

module.exports = app;