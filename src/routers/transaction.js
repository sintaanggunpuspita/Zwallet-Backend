const express = require('express')
const transactionController = require('../controllers/transaction')
const router = express.Router()

router
  .post('/', transactionController.inserttransaction)
  .get('/', transactionController.getAlltransaction)
  .get('/transactionhistory/:userId', transactionController.getAlltransactionhistory)
  .get('/:id', transactionController.gettransactionById)
  .patch('/:id', transactionController.updatetransaction)
  .delete('/:id', transactionController.deletetransaction)

module.exports = router
