const express = require('express')
const historyController = require('../controllers/histories')
const router = express.Router()
const { verifyAccess, verifyAccessSeller } = require('../middlewares/auth')
const { upload } = require('../middlewares/image_history')

router
  .get('/:id', verifyAccess, historyController.getHistoryById)
  .get('/', verifyAccess, historyController.getAllhistory)
  .post('/', verifyAccess, upload, historyController.insertHistory)
  .patch('/:id', verifyAccessSeller, upload, historyController.updateHistory)
  .delete('/:id', verifyAccessSeller, historyController.deleteHistory)

module.exports = router