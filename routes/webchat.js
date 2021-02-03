const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message',{ name : String, message : String})

//const socket = io.connect('http://localhost:3000')

router.get('/', function(_req, res, _next) {
  res.render('webchat');
});

router.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

router.post('/messages', (req, res) => {
  console.log("HOLA?????????????????????")
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
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
