const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
const {verifyAccess} = require('../middlewares/auth')
const {upload} = require('../middlewares/multer')

router
  .post('/login', usersController.loginUsers)
  .post('/register', usersController.registerUsers)
  .get('/', verifyAccess,usersController.getAllUsers)
  .post('/', verifyAccess, upload.single('image'), usersController.insertUsers)
  .get('/:id', usersController.getUsersById)
  .patch('/:id', usersController.updateUsers)
  .delete('/:id', usersController.deleteUsers)


module.exports = router
