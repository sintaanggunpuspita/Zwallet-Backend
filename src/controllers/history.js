const historyModel = require('../models/history')
const helper = require('../helpers/helpers')

const history = {
    inserthistory: (req, res) => {
        const { userId, senderId, receiverId, amount, notes, date } = req.body
        const data = {
            userId,
            senderId,
            receiverId,
            amount,
            notes,
            date
        }
        historyModel.inserthistory(data)
            .then((result) => {
                const resulthistory = result
                console.log(result)
                helper.response(res, resulthistory, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    getAllhistory: (req, res) => {
        historyModel.getAllhistory()
            .then((result) => {
                const resulthistory = result
                helper.response(res, resulthistory, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    gethistoryById: (req, res) => {
        const id = req.params.id
        historyModel.gethistoryById(id)
            .then((result) => {
                const resulthistory = result
                helper.response(res, resulthistory, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    updatehistory: (req, res) => {
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
        historyModel.updatehistory(id, data)
            .then((result) => {
                const resulthistory = result
                console.log(result)
                helper.response(res, resulthistory, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    },
    deletehistory: (req, res) => {
        const id = req.params.id
        historyModel.deletehistory(id)
            .then((result) => {
                const resulthistory = result
                helper.response(res, resulthistory, 200, null)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = history
