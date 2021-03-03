const Chat = require('../models/chat')
const userController = require('../controllers/userController')
const message = require('../models/message')

exports.findById = async (id) => {
    return await Chat.findOne({_id: id}).populate([
        {
            path: 'users',
            model: 'User',
        },
        {
            path: 'messages',
            model: 'Message',
            populate: {
                path: 'user',
                model: 'User'
            }
        }
    ])
}

exports.findPrivateChat = async (firstUser, secondUser) => {
    // encuentra el chat privado que contenga estos dos usuarios
    return await Chat.findOne({ 
        chatType: 'private', 
        users: {
            $all: [firstUser, secondUser]
        }
    })
}

exports.getAllGroups = async () => {
    return await Chat.find({ 
        chatType: 'public', 
    }).populate({
        path: 'users',
        model: 'User'
    }).populate({
        path: 'messages',
        model: 'Message'
    })
}

exports.getAllUsersGroup = async (name) => {
   
    return await Chat.findOne({ 
        name: name
    }, users)
}

exports.findChatById = async (groupId) => {
    return await Chat.findOne({ 
        _id: groupId
    })
}

exports.findChatByName = async (groupName) => {
    return await Chat.findOne({ 
        name: groupName
    })
}

exports.addNewMessage = async (chatId, messageId) => {
    await Chat.findOneAndUpdate({_id: chatId}, 
        {
            $push: {
                messages: messageId
        }
    })
}

exports.getAllMessages = async (chatId) => {
    const chat = await this.findById(chatId)
    return chat.messages
}

exports.verifyPrivateChat = async (req, res, next) => {
    const user = req.user
    const friendId = req.params.friendId

    // busca el chat privado entre los dos 
    const chat = await this.findPrivateChat(user.id, friendId)
    // agrega la variable chatid
    req.chatId = chat.id
    next()
}

exports.createPrivateChat = async (firstUser, secondUser) => {
    const type = 'private'
    const newChat = await new Chat(
        {
            chatType: type, 
            users: [
                firstUser, secondUser
            ]
        }
    );
    newChat.save()
    return newChat
}

exports.createPublicChat = async (name, user) => {
    const type = 'public'
    const newChat = await new Chat(
        {
            name: name,
            chatType: type, 
            users: user
        }
    );
    newChat.save()
    return newChat
}

exports.verifyPublicChat = async (req, res, next) => {
    const groupId = req.params.groupId
    const chat = await this.findChatById(groupId)
    req.chatGroup = chat
    next()
}