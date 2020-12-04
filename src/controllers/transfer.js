const transferModel = require('../models/transfer')
const helper = require('../helpers/helpers')

const transfer = {
    inserttransfer: (req, res) => {
        const { delivery_transactions, receiver_transactions } = req.body
        const data = {
            delivery_transactions,
            receiver_transactions
        }
        const id = req.params.id
        transferModels.getTransferById(id)
        .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'History not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
        transferModel.inserttransfer(data)
         .then((result) => {
                const resulttransfer = result
                console.log(result)
                if (resulttransfer.affectedRows === 0) {
                    return helper.response(res, { message: 'cant add data' }, 404, null)
                } else {
                    helper.response(res, { message: 'successfull add data' }, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getAlltransfer: (req, res) => {
        transferModel.getAlltransfer()
            .then((result) => {
                const resulttransfer = result
                // error handling
                if (resulttransfer.length === 0) {
                    helper.response(res, { message: 'cant search name' }, 404, null)
                } else {
                    helper.response(res, resulttransfer, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    gettransferById: (req, res) => {
        const id = req.params.id
        transferModel.gettransferById(id)
            .then((result) => {
                const resulttransfer = result
                // eror handling
                if (resulttransfer.length === 0) {
                    return helper.response(res, { message: 'id not found' }, 404, null)
                } else {
                    helper.response(res, resulttransfer, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updatetransfer: (req, res) => {
        const id = req.params.id
        const { delivery_transactions, receiver_transactions } = req.body
        const data = {
            delivery_transactions,
            receiver_transactions
        }
        transferModel.updatetransfer(id, data)
            .then((result) => {
                const resulttransfer = result
                console.log(result)
                // eror handling
                if (resulttransfer.affectedRows === 0) {
                    return helper.response(res, { message: 'cant update data' }, 404, null)
                } else {
                    helper.response(res, { message: 'successfull update data' }, 200, null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    deletetransfer: (req, res) => {
        const id = req.params.id
        transferModel.deletetransfer(id)
            .then((result) => {
                const resulttransfer = result
                // eror handling
                if (resulttransfer.affectedRows === 0) {
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

module.exports = transfer
