const messageController = require('./controllers/messageController')
const chatController = require('./controllers/chatController')
const userController = require('./controllers/userController');

// recibe la variable io
module.exports = (io) => {
  users = []
  var userRepeat
  var currentlyChat
  io.on('connection', (socket) => {
    socket.on('connected', async (username, chatId) => {

      socket.join(chatId)
      currentlyChat = chatId

      userRepeat = users.find(user => {
        return user == username
      })
      if (!userRepeat) {
        users.push(username)
        socket.username = username
        socket.broadcast.emit('userconnect', username)
      }

      // Cuando el usuario se conecta se findea los mensajes del campo Message y se lo manda al cliente
      var messages = await chatController.getAllMessages(chatId);
      var chatinfo = await chatController.findChatById(chatId)
      socket.emit("chathistory", messages, chatinfo)
    })

    // Recibe y envia al cliente el mensaje del usuario
    socket.on('message', async (data) => {
      const newMessage = await messageController.createAndSaveMessage(data)
      await chatController.addNewMessage(currentlyChat, newMessage._id)
      io.emit('message', newMessage);
    });

    // Recibe y envia que un usuario esta escribiendo
    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data)
    });

    // Recibe y envia que un usuario se desconecto

    socket.on('disconnect', () => {
      io.emit('userdisconnect', socket.username)
    })
  });
}