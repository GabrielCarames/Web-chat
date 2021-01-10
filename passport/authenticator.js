var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const account = await controller.findAccountById(id);
    done(null, account);
});

passport.use('register', new localStrategy(
    {
        usernameField: 'nickname',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, nickname, password, done) => {
        const values = req.body;
        done(null, newUser);
    }
));

passport.use('login', new localStrategy(
    {
        usernameField: 'nickname',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, nickname, password, done) => {

        done(null, account);
    }
));