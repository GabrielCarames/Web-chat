const messageController = require('./controllers/messageController')
const userController = require('./controllers/userController');

// recibe la variable io
module.exports = (io) => {
    io.on('connection', (socket) => {
  
        // SI EL USuario se conecto, se guarda su nombre y se lo envia al cliente
        socket.on('connected', async (username) => {
            socket.username = username
            socket.broadcast.emit('userconnect', username)

            // Cuando el usuario se conecta se findea los mensajes del campo Message y se lo manda al cliente
            var data = await messageController.getAllMessages();

            socket.emit("chathistory", data)
        })
    

        // Recibe y envia al cliente el mensaje del usuario
        socket.on('message', async (data) => {
          await messageController.createAndSaveMessage(data)
          io.emit('message', data);
        });
      
        // Recibe y envia que un usuario esta escribiendo
        socket.on('typing', (data) => {
          socket.broadcast.emit('typing', data)
        });
      
        // Recibe y envia que un usuario se desconecto
        
        socket.on('disconnect',() => {
          io.emit('userdisconnect', socket.username)
        })
      });
}