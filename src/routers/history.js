const express = require('express')
const historyController = require('../controllers/history')
const router = express.Router()

router
    .post('/', historyController.inserthistory)
    .get('/', historyController.getAllhistory)
    .get('/:id', historyController.gethistoryById)
    .patch('/:id', historyController.updatehistory)
    .delete('/:id', historyController.deletehistory)

module.exports = router