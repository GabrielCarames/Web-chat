const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')

router.get('/:chatid', userController.isAuthenticated, function(req, res, next) {
  const cuenta = req.user
  res.render('chat', cuenta)
});

router.get('/searchchatfriend/:friendId', chatController.verifyPrivateChat, function(req, res) {
  console.log("roleman?")
  const chatId = req.chatId
  // obtiene el chatid que se creo en verifyPrivateChat y lo redirecciona a la ruta de arriba
  res.redirect('/chat/' + chatId)
});

router.get('/searchchatgroup/:groupId', chatController.verifyPublicChat, function(req, res) {
  const chatGroup = req.chatGroup
  console.log("rolemanaratatat?")
  console.log(chatGroup)
  // obtiene el chatid que se creo en verifyPrivateChat y lo redirecciona a la ruta de arriba
  res.redirect('/chat/' + chatGroup.id, chatGroup)
});

//METELO ACA EL GRoup
router.post('/creategroup', async function(req, res) {
  const name = req.body
  const userId = req.user._id
  console.log("sosvos")
  console.log(name)
  await chatController.createPublicChat(name.namegroup, userId)
  //che pone bien esto del success
  req.flash('messageSuccess', 'El grupo se ha creado correctamente')
  res.redirect(req.get('referer'));
});


module.exports = router;
