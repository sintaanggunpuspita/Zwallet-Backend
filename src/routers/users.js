const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()

router
    .post('/', usersController.insertUsers)
    .get('/', usersController.getAllUsers)
    .get('/:id', usersController.getUsersById)
    .patch('/:id', usersController.updateUsers)
    .delete('/:id', usersController.deleteUsers)

module.exports = router
