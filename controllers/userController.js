const User = require('../models/user');
const Notification = require('../models/notification')
const chatController = require('../controllers/chatController')

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

exports.acceptFriendRequest = async (userId, senderId, notificationId) => {
    await this.removeNotification(userId, notificationId) // elimina la notificacion

    // se les agrega a los dos de amigo
    await this.addNewFriend(userId, senderId)
    await this.addNewFriend(senderId, userId)

    // crea el chat privado
    await chatController.createPrivateChat(userId, senderId)
}

exports.getOneFriendByUsername = async (userId, friendUsername) => {
    const friends = await this.getFriends(userId)
    const friend = friends.find(friend => friend.username == friendUsername)
    return typeof friend != 'undefined'
} 

exports.getFriends = async (userId) => {
    const user = await this.findById(userId)
    return user.friends
}

exports.getFriendsQuantity = async (userId) => {
    const user = await this.findById(userId)
    const friends = user.friends
    return Object.keys(friends).length
}

exports.getNotifications = async (userId) => {
    const user = await this.findById(userId)
    return user.notifications
}

exports.getNotificationsQuantity = async (userId) => {
    const user = await this.findById(userId)
    const notifications = user.notifications
    return Object.keys(notifications).length
}

exports.existNotification = async (userId, executorId, notificationType) => {
    const user = await this.findById(userId)
    const notifications = user.notifications
    const action = notifications.find(notification => notification.notificationType == notificationType && notification.from.id == executorId)
    // si no encontro nada el typeof de action vale undefined, entonces si es diferente a undefined es que encontro la notificacion
    return typeof action != 'undefined'
}

exports.removeNotification = async (userId, notificationId) => {
    await User.updateOne({ _id: userId },
        {
            $pull: {
                notifications: notificationId
            }
        }
    )
    await Notification.remove({ _id: notificationId})
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
    return User.findById(id).populate([
        {
            path: 'notifications',
            model: 'Notification',
            populate: {
                path: 'from',
                model: 'User'
            }
        },
        {
            path: 'friends',
            model: 'User',
        }
    ])
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