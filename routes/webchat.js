const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

router.get('/', function(_req, res, _next) {
  res.render('webchat');
});

router.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

router.post('/messages', async (req, res) => {
  /*ya no sirve creo
  const {message} = req.body;
  const newMessage = new Message({message});
  console.log('nuevomensaje')
  await newMessage.save();
  newMessage.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
  */
})

module.exports = router;
