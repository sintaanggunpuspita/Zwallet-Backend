const express = require('express')
const transferController = require('../controllers/transfer')
const router = express.Router()

router
    .post('/transfer', transferController.inserttransfer)
    .get('/', transferController.getAlltransfer)
    .get('/:id', transferController.gettransferById)
    .patch('/:id', transferController.updatetransfer)
    .delete('/:id', transferController.deletetransfer)

module.exports = router
