const express = require('express');
var router = express.Router();
const Message = require('../models/message');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', () =>{
  console.log('se conectó un usuario')
 })

//const socket = io.connect('http://localhost:3000')

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

/*let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('btn');
//let output = document.getElementById('output');
//let actions = document.getElementById('actions');

btn.addEventListener('click', function(){
  socket.emit('mimensaje', {
    message: message.value,
    username: username.value
  })
})*/

module.exports = router;
