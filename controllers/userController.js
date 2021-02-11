const User = require('../models/user');
const Notification = require('../models/notification');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

exports.addNotification = (friendId, newNotification) => {
    // encuentra y actualiza agregandole la nueva notificacion al campo notifications
    //const query = { _id: friendId}
    return User.findOneAndUpdate({_id: friendId},
        {
            country: 'tachancka'
        }
    )
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

exports.InsertOne = (friend, holasosmiamigo) => {
    console.log(friend.holasosmiamigo)
    //User.notifications.push(friend.holasosmiamigo);
    const nuevaNotificacion = new Notification({
        notificationType: friend.holasosmiamigo, from: friend.id
    })
    nuevaNotificacion.save();
    //return User.collection("notifications").insertOne({"_id": friend.id}, {$set: data}
//)
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