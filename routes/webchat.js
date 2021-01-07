var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = mongoose.model('Message',{ name : String, message : String})

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

module.exports = router;
