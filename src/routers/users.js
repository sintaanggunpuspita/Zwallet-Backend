const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const {verifyAccess} = require('../middlewares/auth')
const {upload} = require('../middlewares/multer')
const { cacheGetAllUsers } = require('../middlewares/redis')

router
  .post('/login', usersController.loginUsers)
  .post('/register', upload.single('image'),usersController.registerUsers)
  .post('/email',usersController.sendEmail)
  .get('/',cacheGetAllUsers,verifyAccess,usersController.getAllUsers)
  .get('/:id', usersController.getUsersById)
  .patch('/:id', usersController.updateUsers)
  .delete('/:id', usersController.deleteUsers)
  

module.exports = router
