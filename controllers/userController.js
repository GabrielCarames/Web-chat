const User = require('../models/user');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

exports.addNewFriend = async (userId, newFriend) => {
    await User.findOneAndUpdate({_id: userId},
        {
            $push:{
                friends: newFriend
            }
        }
    )
}

exports.removeFriendRequest = async (userId, notificationId) => {
    console.log("mamita")
    console.log(userId)
    console.log(notificationId)
    User.find({_id: userId}).then(function() {
        notifications.forEach(function(u) {
            if(u._id == notificationId){
                User.findOneAndUpdate({ _id: userId },
                    { //doble find al pedo ayda tampoc le gusta la sintaxis nada
                        $pull: {
                            u.notifications: {
                                _id = notificationId
                            }
                        }
                    }
                )
            }//hay un re quilombo con los corchetes xDd
        }
    })
}        
      
    /*User.findOneAndUpdate({ _id: userId },
        { 
            $pull: {
                notifications: { 
 
                     _id: notificationId 

                } 
            }
        }
    )*/
    /*
        User.update({ _id: userId },
        { 
            $pull: { 
                notifications: { 
                    from: {
                        $in:{
                            _id: senderId
                        }
                    },
                    notificationType: 'friendRequest'    
                } 
            }
        },
        { multi: true }
    )
    */


exports.acceptFriendRequest = async (userId, senderId, notificationId) => {
    await this.removeFriendRequest(userId, notificationId) // elimina la notificacion
    
    // se les agrega a los dos de amigo
    await this.addNewFriend(userId, senderId)
    await this.addNewFriend(senderId, userId)
}

exports.getNotifications = async (userId) => {
    const query = await this.findById(userId)
    const notifications = query.notifications
    return notifications
}

exports.getNotificationsQuantity = async (userId) => {
    const query = await this.findById(userId)
    const notifications = query.notifications
    return Object.keys(notifications).length
}

exports.getFriendRequest = async (userId, senderId) => {
    return await User.findOne({ _id: userId},
        {
            'notifications.from': senderId,
            'notifications.notificationType': 'friendRequest'
        }
    )
}

exports.existNotification = async (friendId, executorId, notificationType) => {
    const query = await User.findOne({ _id: friendId},
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
    return User.findOneAndUpdate({_id: friendId},
        {$push:{
            notifications: newNotification
        }},(err) => {
            if(err){
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
    return User.findOne({'username': name})
}

exports.findByEmail = async (email) => {
    return User.findOne({'email': email})
}

exports.findByPassword = async (password) => {
    return User.findOne({'password': password})
}

exports.getUsername = async (id) => {
    const user = this.findById(id);
    return user.username
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