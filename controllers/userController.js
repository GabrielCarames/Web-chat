const User = require('../models/user');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

exports.findById = async (id) => {
    return User.findById(id)
}

exports.findByUsername = async (name) => {
    return User.findOne({'username': name})
}

exports.findByEmail = async (email) => {
    return User.findOne({'email': email})
}

exports.findByPassword = async (password) => {
    return User.findOne({'password': password})
}

exports.createUser = async (values) => {
    const {username, password, email, country, gender} = values
    const newUser = new User({username, password, email, country, gender})
    await newUser.save()
    return newUser
}

exports.createMessage = async (values) => {
    const message = values
    const newMessage = new User(message)
    await newMessage.save()
    return newMessage
}