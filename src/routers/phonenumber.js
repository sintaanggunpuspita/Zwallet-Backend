const express = require('express')
const phonenumberController = require('../controllers/phonenumber')
const router = express.Router()

router
    .post('/', phonenumberController.insertphonenumber)
    .get('/', phonenumberController.getAllphonenumber)
    .get('/:id', phonenumberController.getphonenumberById)
    .patch('/:id', phonenumberController.updatephonenumber)
    .delete('/:id', phonenumberController.deletephonenumber)

module.exports = router
