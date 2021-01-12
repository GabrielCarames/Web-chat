var express = require('express');
var router = express.Router();
const Message = require('../models/message');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', () =>{
  console.log('se conectó un usuario')
 })

router.get('/', function(_req, res, _next) {
  res.render('webchat');
});

router.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

router.post('/messages', async (req, res) => {
  const {message} = req.body;
  const newMessage = new Message({message});

  await newMessage.save();
  newMessage.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})

module.exports = router;
