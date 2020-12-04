const transactionModel = require('../models/transaction')
const helper = require('../helpers/helpers')

const transaction = {
  inserttransaction: (req, res) => {
    const { userId, senderId, receiverId, amount, notes } = req.body
    const data = {
      userId,
      senderId,
      receiverId,
      amount,
      notes,
      date: new Date()
    }
    transactionModel.inserttransaction(data)
      .then((result) => {
        const resulttransaction = result
        console.log(result)
        if (resulttransaction.affectedRows === 0) {
          return helper.response(res, { message: 'cant add data' }, 404, null)
        } else {
          helper.response(res, { message: 'successfull add data' }, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAlltransaction: (req, res) => {
    transactionModel.getAlltransaction()
      .then((result) => {
        const resulttransaction = result
        console.log (res.json(result))  
        // error handling
        // if (resulttransaction.length === 0) {
        //   helper.response(res, { message: 'cant search name' }, 404, null)
        // } else {
        //   helper.response(res, resulttransaction, 200, null)
        // }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAlltransactionhistory: (req, res) => {
    transactionModel.getAlltransactionhistory()
      .then((result) => {
        const resulttransaction = result
        // error handling
        if (resulttransaction.length === 0) {
          helper.response(res, { message: 'cant search name' }, 404, null)
        } else {
          helper.response(res, resulttransaction, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  gettransactionById: (req, res) => {
    const id = req.params.id
    transactionModel.gettransactionById(id)
      .then((result) => {
        const resulttransaction = result
        // eror handling
        if (resulttransaction.length === 0) {
          return helper.response(res, { message: 'id not found' }, 404, null)
        } else {
          helper.response(res, resulttransaction, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updatetransaction: (req, res) => {
    const id = req.params.id
    const { userId, senderId, receiverId, amount, notes, date } = req.body
    const data = {
      userId,
      senderId,
      receiverId,
      amount,
      notes,
      date
    }
    transactionModel.updatetransaction(id, data)
      .then((result) => {
        const resulttransaction = result
        console.log(result)
        // eror handling
        if (resulttransaction.affectedRows === 0) {
          return helper.response(res, { message: 'cant update data' }, 404, null)
        } else {
          helper.response(res, { message: 'successfull update data' }, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deletetransaction: (req, res) => {
    const id = req.params.id
    transactionModel.deletetransaction(id)
      .then((result) => {
        const resulttransaction = result
        // eror handling
        if (resulttransaction.affectedRows === 0) {
          return helper.response(res, { message: 'cant delete data' }, 404, null)
        } else {
          helper.response(res, { message: 'successfull delete data' }, 200, null)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = transaction
