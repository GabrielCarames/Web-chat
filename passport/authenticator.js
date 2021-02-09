const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// controlador de usuarios
const userController = require('../controllers/userController')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userController.findById(id)
    done(null, user);
});

passport.use('register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    const targetUser = await userController.findByUsername(username)
    // si ya existe la cuenta cancela el registro, sino existe crea el usuario
    if (targetUser) return done(null, false);
    else {
        const newUser = await userController.createUser(req.body)
        done(null, newUser);
    }
}
));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const targetUser = await userController.findByEmail(email)
    console.log(targetUser)
    if (!targetUser) return done(null, false)
    return done(null, targetUser);
}));