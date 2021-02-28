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

exports.getAllGroups = async (user) => {
    // encuentra el chat publico con cierta
    return await Chat.find({ 
        chatType: 'public', 
        users: {
            $all: [user]
        }
    })
}

exports.findChatById = async (groupId) => {
    // encuentra el chat publico con cierta id
    return await Chat.findOne({ 
        _id: groupId
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
    console.log("soybatman")
    console.log(chat)
    console.log(chat.id)
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
    console.log("uretra")
    console.log(groupId)
    // busca el chat publico
    const chat = await this.findChatById(groupId)
    console.log("rota")
    console.log(chat)
    console.log(chat.id)
    // agrega la variable chatid
    req.chatGroupId = chat.id
    next()
}