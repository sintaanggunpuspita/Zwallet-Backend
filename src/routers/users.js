const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const {verifyAccess} = require('../middlewares/auth')
const {upload} = require('../middlewares/multer')
const { cacheGetAllUsers } = require('../middlewares/redis')

router
  .post('/login', usersController.loginUsers)
  .post('/register', usersController.registerUsers)
  .post('/email',usersController.sendEmail)
  .get('/',verifyAccess,cacheGetAllUsers,usersController.getAllUsers)
  .get('/:id', usersController.getUsersById)
  // .patch('/:id', upload.single('image'),usersController.updateUsers)
  .delete('/:id', usersController.deleteUsers)
  // .get('/:id', usersController.getallPrice)
  .patch('/:id', upload.single('image'),usersController.updateProfile)
  // .get('/friends/:id', usersController.getFriendsById)
  .get('/friends/:id', usersController.getFriends)
  

  

module.exports = router
