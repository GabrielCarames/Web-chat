var express = require('express');
var router = express.Router();
const Message = require('../models/message');

router.get('/', function(_req, res, _next) {
  res.render('webchat');
});

router.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

router.post('/messages', async (req, res) => {
  const { name, message} = req.body;
  const newMessage = new Message({name, message});

  await newMessage.save();
  
  res.sendStatus(200);
})

module.exports = router;
