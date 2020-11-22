const express = require('express')
const phoneController = require('../controllers/phone')
const router = express.Router()

router
    .post('/', phoneController.insertphone)
    .get('/', phoneController.getAllphone)
    .get('/:id', phoneController.getphoneById)
    .patch('/:id', phoneController.updatephone)
    .delete('/:id', phoneController.deletephone)

module.exports = router
