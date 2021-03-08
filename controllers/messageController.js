const Message = require('../models/message');
const userController = require('../controllers/userController');


exports.getAllMessages = async () => {
    return Message.find({});
}

exports.createAndSaveMessage = async (data) => {
    const {message, username} = data

    // encuentra al usuario por su username
    const user = await userController.findByUsername(username);

    const newMessage = new Message({message, user})
    await newMessage.save();
    return newMessage
}

// encuentra un mensaje por contenido
exports.findByContent = async (content) => {
    return Message.findOne({message: content})
}

// encuentra un mensaje por el id del usuario
exports.findByCreatorId = async (id) => {
    return Message.findOne({creatorId: id})
}

exports.findMessageById = async (messageId) => {
    return await Message.findOne({ 
        _id: messageId
    })
}

exports.updateMessage = async (messageId, content) => {
    await Message.findOneAndUpdate({_id: messageId}, 
        {
            $push: {
                message: content
        }
    })
}