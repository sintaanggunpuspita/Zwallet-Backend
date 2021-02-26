const historyModels = require('../models/histories')
const helpers = require('../helpers/helpers')

const histories = {
  getHistoryById: (req, res) => {
    const id = req.params.id
    historyModels.getHistoryById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Data search not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getAllhistory: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const page = req.query.page
    const limit = req.query.limit

    historyModels.getAllhistory(search, sort, page, limit)
      .then((result) => {
        if (result != '') {
          helpers.response(res, page, result, 200, null)
        } else {
          helpers.response(res, null, 'Data search not found', 200, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  updateHistory: (req, res) => {
    const id = req.params.id
    const { idUser, phone } = req.body
    const data = {
      idUser,
      phone
    }
    historyModels.updateHistory(id, data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  
  deleteHistory: (req, res) => {
    const id = req.params.id
    historyModels.deleteHistory(id)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertHistory: (req, res) => {
    const { idUser } = req.body
    const data = {
      idUser
    }
    historyModels.insertHistory(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = histories