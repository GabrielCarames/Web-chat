var express = require('express');
const http = require('http')
var app = express();
var exphbs  = require('express-handlebars');
var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session'); 

require('./passport/authenticator');

// dir routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var webchatRouter = require('./routes/webchat');
var server = http.createServer(app)
server.listen(3000)a

app.use(express.static(path.join(__dirname, 'public')));

var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log('new connection', socket.id)
})

// engine settings
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials',
    extname: '.hbs',
    //helpers: require('./lib/helpers') no usamos helper todavia
}));
app.set('view engine', 'hbs');

// config app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
require("./db");

// routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/webchat', webchatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(session({
  secret: "clave super secreta",
  resave: false,
  saveUninitialized: true
}));

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