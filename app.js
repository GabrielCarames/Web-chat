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
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`Http escuchando en: http://localhost:${port}`);
});

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
app.use(express.static(path.join(__dirname, 'public')));
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

io.on('connection', (socket) => {
  console.log('se conectó un usuario');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('disconnect', () => {
    console.log('un usuario se fué a la meirda');
  });
});

module.exports = app;