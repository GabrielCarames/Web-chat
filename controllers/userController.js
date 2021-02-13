const User = require('../models/user');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

exports.existNotification = async (friendId, executorId, notificationType) => {
    return await User.findOne({ _id: friendId},
        {
            'notifications.from': executorId,
            'notifications.notificationType': notificationType
        }
    );
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