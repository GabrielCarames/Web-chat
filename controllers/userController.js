const { populate } = require('../models/user');
const User = require('../models/user');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

exports.addNewFriend = async (userId, newFriend) => {
    await User.findOneAndUpdate({ _id: userId },
        {
            $push: {
                friends: newFriend
            }
        }
    )
}

exports.removeNotification = async (userId, notificationId) => {
    console.log(userId)
    console.log(notificationId)
    var user = await this.findById(userId)
    var a = user.notifications.map(n => {
        if (n._id != notificationId)
            return n
    })
    console.log(a)
    //user.save()
}

exports.acceptFriendRequest = async (userId, senderId, notificationId) => {
    await this.removeNotification(userId, notificationId) // elimina la notificacion

    /*
    // se les agrega a los dos de amigo
    await this.addNewFriend(userId, senderId)
    await this.addNewFriend(senderId, userId)
    */
}

exports.getNotifications = async (userId) => {
    const query = await User.findOne({ _id: userId}).populate({
            path: 'notifications',
            model: 'Notification',
            populate: {
                path: 'from',
                model: 'User'
            }
        })
    const notifications = query.notifications
    console.log(notifications)
    return notifications
}

exports.getNotificationsQuantity = async (userId) => {
    const query = await this.findById(userId)
    const notifications = query.notifications
    return Object.keys(notifications).length
}

exports.getFriendRequest = async (userId, senderId) => {
    return await User.findOne({ _id: userId },
        {
            'notifications.from': senderId,
            'notifications.notificationType': 'friendRequest'
        }
    )
}

exports.existNotification = async (friendId, executorId, notificationType) => {
    const query = await User.findOne({ _id: friendId },
        {
            'notifications.from': executorId,
            'notifications.notificationType': notificationType
        }
    )
    const notifications = query.notifications
    // retorna la cantidad de notificaciones que tiene, 0 es falso y si es mayor a 0 es true.
    return Object.keys(notifications).length
}

exports.addNotification = (friendId, newNotification) => {
    // encuentra y actualiza agregandole la nueva notificacion al campo notifications
    return User.findOneAndUpdate({ _id: friendId },
        {
            $push: {
                notifications: newNotification
            }
        }, (err) => {
            if (err) {
                console.log(err)
            }
            console.log("ganaste")
        }
    )
}

exports.findById = async (id) => {
    return User.findById(id)
}

exports.findByUsername = async (name) => {
    return User.findOne({ 'username': name })
}

exports.findByEmail = async (email) => {
    return User.findOne({ 'email': email })
}

exports.findByPassword = async (password) => {
    return User.findOne({ 'password': password })
}

exports.getUsername = async (id) => {
    const user = this.findById(id);
    return user.username
}

exports.createUser = async (values) => {
    const { username, password, email, country, gender } = values
    const newUser = new User({ username, password, email, country, gender })
    await newUser.save()
    return newUser
}

exports.createMessage = async (values) => {
    const message = values
    const newMessage = new User(message)
    await newMessage.save()
    return newMessage
}