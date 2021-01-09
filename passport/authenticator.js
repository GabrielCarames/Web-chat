var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const controller = require("../controllers/user.controllers");

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
        
        if(await controller.existAccount(values)){
            return done(null, false, req.flash('messageFailure', "Ya existe una cuenta con estos datos."));
        }else{
            const newUser = await controller.createAccount(values);
            done(null, newUser);
        }
    }
));

passport.use('login', new localStrategy(
    {
        usernameField: 'nickname',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, nickname, password, done) => {
        const query = await controller.findAccountByNick(nickname);

        if(!query) 
        return done(null, false, req.flash('messageFailure', "No existe esa cuenta."));

        const account = query.dataValues;
        if(password != account.password)
        return done(null, false, req.flash('messageFailure', "La contraseña es incorrecta."));
        
        done(null, account);
    }
));